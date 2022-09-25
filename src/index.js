import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

import socketio from './socketio.js'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import roomRoute from './routes/room.route.js'

import User from './models/user.model.js'

dotenv.config()
const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    //origin: 'http://localhost:3000',
    //origin: 'hhttp://192.168.0.103:3000',
    methods: ['get', 'post']
  }
})

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    main()
  })
  .catch(error => {
    console.log(error)
  })


function main() {
  socketio(io)
  app.use(cors())
  app.use(express.json())
  app.use('/auth', authRoute)
  app.use('/message', messageRoute)
  app.use('/room', roomRoute)

  httpServer.listen(process.env.PORT || 5001, () => {
    console.log(`app is running!!`)
  })
}




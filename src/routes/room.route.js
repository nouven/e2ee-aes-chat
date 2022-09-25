import express from 'express'
import roomController from '../controllers/room.controller.js'
const router = express.Router()

router.get('/',roomController.getAllRoom)

export default router

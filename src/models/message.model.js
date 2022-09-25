import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
  roomid: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
    require: true,
  },
  content: {
    type: String,
  },
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  isencrypted:{
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default model('messages', messageSchema)


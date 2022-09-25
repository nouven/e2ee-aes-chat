import {Schema, model} from 'mongoose' 

const roomSchema = new Schema({
  members: [
    {
      userid:{
        type: String,
      },
      username: {
        type:String,
      }
    }
  ],
  isencrypted:{
    type:Boolean,
    default: false,
  }
},{timestamps: true})

export default model('rooms', roomSchema)

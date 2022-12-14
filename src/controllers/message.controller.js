import Message from '../models/message.model.js'
export default {
  createMessage: async (req, res) => {
    let {roomid, type, content, sender, receiver, isencrypted} = req.body
    Message({
      roomid,
      type,
      content,
      sender,
      receiver,
      isencrypted
    }).save()
      .then(() => {
        return res.status(200).json({message: 'successfully!!'})
      })
      .catch((error) => {
        return res.status(500).json({error})
      })
  },

  getAllMessage: async(req, res) => {
    try{
      let roomid = req.query.roomid
      let messages = await Message.find({roomid}).sort({createdAt: -1}).exec()
      return res.status(200).json(messages)
    }
    catch(error){
      return res.status(500).json(error)
    }
  }
}

import Room from '../models/room.model.js'
export default {
  getAllRoom: (req, res) => {
    let _id = req.query._id
    Room.find({ members: { $elemMatch: { userid: _id } } })
      .then(rooms => {
        return res.status(200).json(rooms)
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}

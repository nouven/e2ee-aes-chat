import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import utils from '../utils/index.js'
import jwt from 'jsonwebtoken'
import Room from '../models/room.model.js'
export default {
  login: async (req, res) => {
    let { username, password } = req.body
    try {
      let user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: 'user not exist!!' })
      }
      let checkPassword = await bcrypt.compare(password, user.password)
      if (!checkPassword) {
        return res.status(400).json({ message: 'username or password is incorrect!!' })
      }
      let token = utils.generateToken({ _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_KEY, '3h')
      return res.status(200).json({ token })
    }
    catch (error) {
      return res.status(500).json({ error })
    }
  },
  register: async (req, res) => {
    try {
      let { username, password } = req.body
      let salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password, salt)
      let newUser = await User({
        username,
        password
      }).save()

      let users = await User.find({_id: {$ne: newUser._id}})
      users.forEach(user => {
        let members = [{userid: user._id, username: user.username}, {userid: newUser._id, username: newUser.username}]
        Room({members}).save()
      })
      return res.status(200).json({ message: 'successfully!!' })
    }
    catch (error) {
      return res.status(500).json(error )
    }
  },
  verifyToken: (req, res) => {
    try {
      let token = req.headers.token.split(' ')[1]
      let info = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
      return res.status(200).json(info)
    }
    catch (error) {
      return res.status(500).json({ error })
    }
  }
}

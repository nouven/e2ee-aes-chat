import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import utils from '../utils/index.js'
export default{
  login:  async (req, res) => {
    let {_id,username, password} = req.body
    try{
      let user = await User.findOne({username})
      if(!user){
        return res.status(400).json({message: 'user not exist!!'})
      }
      let checkPassword = await bcrypt.compare(password, user.password)
      if(!checkPassword){
        return res.status(400).json({message: 'username or password is incorrect!!'})
      }
      let token = utils.generateToken({_id, username}, process.env.ACCESS_TOKEN_KEY,'3h')
      return res.status(200).json({token})
    }
    catch(error){
      return res.status(500).json({error})
    }
  },
  register: async(req, res) =>{
  try{
    let {username, password} = req.body
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    let newUser = User({
      username,
      password
    })
    newUser.save()
      .then(() => {
        return res.status(200).json({message: 'successfully!!'})
      })
      .catch((error) => {
        return res.status(500).json({error})
      })
    }
    catch(error){
      return res.status(500).json({error})
    }
  }
}

import jwt from 'jsonwebtoken'
export default {
  generateToken: (payload, key, expiresIn) => {
    return jwt.sign(payload, key, {expiresIn})
  }
}




export default {
  verifyToken:(req, res, next) => {
    let token = req.headers.token.split(' ')[1]
    return res.json({token})
  }
}


const jwt = require('jsonwebtoken')
const User = require('./userModel')

authenticate = async (req, res, next) => {

  let token = req.header('blog-user-id')
  try {
    let decoded = await jwt.verify(token, 'dntpwnme8') // decoded._id
    let user = await User.findOne({
      _id: decoded._id,
      "sessionToken.token": token
    })
    if (!user) throw 'Authentication failed'
    req.user = user
    req.token = token
    next()
  } catch (e) {
    e = e.message == "jwt malformed" ? 'Wrong session token' : e
    res.status(401).json(e)
  }


}

module.exports = {
  authenticate
}
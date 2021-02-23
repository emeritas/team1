const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./userModel')

signUp = async (req, res) => {
  let user = new User(req.body)
  try {
    let createdUser = await user.save()
    res.json(createdUser)
  } catch (e) {
    res.status(400).json(e)
  }
}

login = async (req, res) => {
  try {
    let user = await User.findOne({
      username: req.body.username
    })
    if (!user) throw "User doesn't exist"
    let response = await bcrypt.compare(req.body.password, user.password)

    if (!response) throw 'Incorrect password'
    let token = await jwt.sign({
      _id: user._id.toHexString()
    }, 'dntpwnme8').toString()
    user.sessionToken.push({
      token
    })
    await user.save()
    res.header('blog-user-id', token).json(user)
  } catch (e) {
    res.status(401).json(e)
  }
}

logout = async (req, res) => {
  let token = req.token;
  let user = req.user
  try {
    await user.update({
      $pull: {
        sessionToken: {
          token
        }
      }
    })
    res.json('successfull logout')
  } catch (e) {
    res.status(400).json(e)
  }
}

changePicture = async (req, res) => {
  let file = req.file;
  let user = req.user;
  try {
    user.profileImageURL = file.path
    await user.save()
    res.json(user)
  } catch (e) {

  }
}

updateUserInfo = async(req,res) => {
    let user = req.user
    try {
       user.description = req.body.description
       await user.save();
       res.json(user) 
    } catch(e) {
        console.log(e)
    }
}

getAllUsers = async (req,res) => {
    try {
        let users = await User.find({})
        res.json(users);
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
  signUp,
  login,
  logout,
  changePicture,
  getAllUsers,
  updateUserInfo
}
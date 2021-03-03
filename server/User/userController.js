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
    if(!user.profileImageURL) {
      user.profileImageURL = `http://localhost:3001/uploads/1614798015243-neaiskus.png`;
    }
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
  console.log(file)
  try {
    user.profileImageURL = `http://localhost:3001/uploads/${file.filename}`
    await user.save()
    res.json(user)
  } catch (e) {
    console.log(e)
  }
}

updateUserInfo = async(req,res) => {
    let user = req.user;
    let file = req.file;
    try {
      if(req.body.password || req.body.password2) {
        if(!req.body.password) throw 'Enter your old password'
        if(!req.body.password2) throw 'Enter new password'
        let response = await bcrypt.compare(req.body.password, user.password);
        if (!response) throw 'Incorrect password';
        user.password = req.body.password2;
      }
       if(req.body.description) user.description = req.body.description;
       if(req.body.email) user.email = req.body.email;
       if(req.body.username)user.username = req.body.username;
       if(user.profileImageURL){
          user.profileImageURL = `http://localhost:3001/uploads/${file.filename}`
        }else {
          user.profileImageURL = `http://localhost:3001/uploads/1614798015243-neaiskus.png`;
        }
       await user.save();
       res.json(user);
    } catch(e) {
      console.log(e);
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

getCurrentUser = async (req,res) => {
  let user = req.user;
  try {
    res.json(user);
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  signUp,
  login,
  logout,
  changePicture,
  getAllUsers,
  updateUserInfo,
  getCurrentUser
}
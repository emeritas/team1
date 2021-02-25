const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required testas']
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Wrong email! testas"
    }
  },
  description: {
      type: String
  },
  profileImageURL: {
    type: String
  },
  sessionToken: [{
    token: String
  }]
})

UserSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})



let User = mongoose.model('User', UserSchema)

module.exports = User
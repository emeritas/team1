const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


let BlogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    publishDate: {
        type: Date
    },
    category: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true, 
        ref: 'User'
    }
})

let Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
const { request } = require('express');
const jwt = require('jsonwebtoken')
const Blog = require('./blogModel')

saveBlog = async (req, res) => {
    let body = req.body;
    let file = req.file;
    console.log(req.user)
    /* console.log(body)
    console.log(req.user) */
    let blog = new Blog({
        content: body.content,
        title: body.title,
        category: body.category,
        author: req.user.username,
        publishDate: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    })
  
    try {
        blog.coverImageURL = `http://localhost:3001/${file.path}`
        let savedBlog = await blog.save()
        res.json(savedBlog)
    } catch(e) {
        res.status(400).json(e)
    }
}

getAllBlog = (req, res) => {
    Blog.find({
        author: req.user.username
    }, (items, error) => { 
        if (error) return res.json(error)
        res.json(items)
    })
}


updateBlog = async(req,res) => {
    try {
        let updated = await Blog.findOneAndUpdate(req.params.id, req.body)
        res.json(updated)
    } catch (e) {
        res.status(400).json(e)
    }
}


removeBlog = async (req, res) => {
    try {
        await Blog.findOneAndRemove(req.params.id, req.body)
        res.json('success')
    } catch (e) {
        res.status(400).json(e)
    }
}

addCoverImage = async (req, res) => {
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

module.exports = {
    saveBlog,
    getAllBlog,
    removeBlog,
    addCoverImage,
    updateBlog
}
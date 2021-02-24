const { request } = require('express');
const Blog = require('./blogModel')

saveBlog = async (req, res) => {
    let body = req.body

    let blog = new Blog({
        content: body.content,
        title: body.title,
        category: body.category,
        author: req.user._id,
    })

    try {
        let savedBlog = await blog.save()
        res.json(savedBlog)
    } catch(e) {
        res.status(400).json(e)
    }
}

getAllBlog = (req, res) => {
    Blog.find({
        author: req.user._id
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
    let blog = req.blog;
    try {
      blog.coverImageURL = file.path
      await blog.save()
      res.json(blog)
    } catch (e) {
  
    }
}

module.exports = {
    saveBlog,
    getAllBlog,
    removeBlog,
    addCoverImage,
    updateBlog
}
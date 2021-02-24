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

removeBlog = async (req, res) => {
    try {
        await Blog.findOneAndRemove({
            _id: req.params.id,
            author: req.user._id
        })
        res.json('success')
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    saveBlog,
    getAllBlog,
    removeBlog
}
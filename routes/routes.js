const router = require('express').Router()
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
// const upload = multer({
//     storage
// })

// const UserController = require('../user/userController')
// const UserMiddleware = require('../user/auth')


router.get('/', (req, res) => {
    res.json('Hello Team1')
})


// All User Routes
// router.post('/user/signup', UserController.signup)
// router.post('/user/login', UserController.login)
// router.get('/user/logout', UserMiddleware.authenticate, UserController.logout)

// router.post('/uploadImage', UserMiddleware.authenticate, upload.single('fileName'), UserController.uploadImage)

module.exports = router
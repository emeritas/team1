const router = require('express').Router()

const UserController = require('../User/userController')
const UserMiddleware = require('../User/authenticate')

router.get('/', (req, res) => {
    res.json('Hello Team1')
})


router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.get('/logout', UserMiddleware.authenticate, UserController.logout)
router.get('/users', UserController.getAllUsers)
router.post('/user',UserMiddleware.authenticate, UserController.updateUserInfo)

module.exports = router
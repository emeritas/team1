const router = require('express').Router()
//FAILU TALPINIMUI
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage
})

const UserController = require('../User/userController')
const UserMiddleware = require('../User/authenticate')
const CategoryController = require('../Category/categoryController')


router.get('/', (req, res) => {
    res.json('Hello Team1')
})

// User routes
router.post('/signup', UserController.signUp)
// userio prisijungimas
router.post('/login', UserController.login)
// userio atsijungimas ir token sunaikinimas
router.get('/logout', UserMiddleware.authenticate, UserController.logout)
// gauti visus useriui(testavimui)
router.get('/users', UserController.getAllUsers)
// atnaujinti userio descriptionui
router.post('/user', UserMiddleware.authenticate, UserController.updateUserInfo)
// failu ikelimas(NETIKRINAU AR VEIKIA NES NEZINAU KAIP DABAR PATIKRINT BE FE, KAI BUS FRONT ENDAS TADA TURBUT ZIURESIM)
router.post('/uploads', UserMiddleware.authenticate, upload.single('test'), UserController.changePicture)







// Category routes
router.post('/category/add', CategoryController.addCategory)
router.get('/category/get', CategoryController.getAll)
router.patch('/category/update/:id', CategoryController.updateCategory)
router.post('/category/delete/:id', CategoryController.deleteCategory)

module.exports = router
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

// Ka useris gales padaryti
const UserController = require('../User/userController')
// userio autentifikacija
const UserMiddleware = require('../User/authenticate')
const BlogControler = require('../Blog/blogController')

router.get('/', (req, res) => {
    res.json('Hello Team1')
})

// userio registracija
router.post('/signup', UserController.signUp)
// userio prisijungimas
router.post('/login', UserController.login)
// userio atsijungimas ir token sunaikinimas
router.get('/logout', UserMiddleware.authenticate, UserController.logout)
// gauti visus useriui(testavimui)
router.get('/users', UserController.getAllUsers)
// atnaujinti userio descriptionui
router.post('/user',UserMiddleware.authenticate, UserController.updateUserInfo)
// failu ikelimas(NETIKRINAU AR VEIKIA NES NEZINAU KAIP DABAR PATIKRINT BE FE, KAI BUS FRONT ENDAS TADA TURBUT ZIURESIM)
router.post('/uploads', UserMiddleware.authenticate, upload.single('test'), UserController.changePicture)



// Blog routes
// išsaugoti blogo straipsnį
router.post('/blog', UserMiddleware.authenticate, BlogControler.saveBlog);
// gauti visus straipsnius pagal userį
router.get('/blog', UserMiddleware.authenticate,  BlogControler.getAllBlog)
// ištrinti blogo straipsnį



module.exports = router
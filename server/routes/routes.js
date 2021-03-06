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

const CategoryController = require('../Category/categoryController')

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
router.get('/currentUser',UserMiddleware.authenticate, UserController.getCurrentUser)
// atnaujinti userio duomenim
router.post('/user', UserMiddleware.authenticate, upload.single('test'), UserController.updateUserInfo)
// failu ikelimas(NETIKRINAU AR VEIKIA NES NEZINAU KAIP DABAR PATIKRINT BE FE, KAI BUS FRONT ENDAS TADA TURBUT ZIURESIM)
router.post('/uploads', UserMiddleware.authenticate, upload.single('test'), UserController.changePicture)
//visu useriu naikinimas
router.delete('/killAllUsers', UserController.deleteAllUsers)

// Category routes
router.post('/category/add', CategoryController.addCategory)
router.get('/category/get', CategoryController.getAll)
router.patch('/category/update/:id', CategoryController.updateCategory)
router.post('/category/delete/:id', CategoryController.deleteCategory)
router.get('/category/getTitle/:id', CategoryController.getCategoryTitle)

// Blog routes 
// išsaugoti blogo straipsnį
router.post('/blog', UserMiddleware.authenticate, upload.single('test'), BlogControler.saveBlog);
// gauti visus straipsnius pagal userį
router.get('/blog', UserMiddleware.authenticate,  BlogControler.getAllBlog)
// ištrinti blogo straipsnį
router.delete('/blog/:id', UserMiddleware.authenticate, BlogControler.removeBlog)
// uždėti straipsniui paveikslėlį
router.post('/blog/uploads', UserMiddleware.authenticate, upload.single('test'), BlogControler.addCoverImage)
// atnaujinti blogo įrašą
router.patch('/blog/:id', UserMiddleware.authenticate, BlogControler.updateBlog)
// gauti visus blogo irasus
router.get('/getAllBlogs', BlogControler.getActuallyAllBlogs)
// istrinti visus blogo irasus
router.delete('/blogKillAll', BlogControler.deleteAllBlogs)
// gauti visus blogo irasus pagal kategorija
router.post('/blogsByCategory', BlogControler.getBlogsByCategory)
module.exports = router
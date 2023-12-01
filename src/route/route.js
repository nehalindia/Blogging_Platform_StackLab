const express = require('express')
const router = express.Router()

const { createBlog,getBlog,getBlogById,updateBlog,deleteBlog } = require('../controller/blogcontroller')
const { registerUser, userLogin } = require('../controller/usercontroller')
const { authenticate } = require('../middelware/authentication')

router.post('/signup', registerUser)
router.post('/login', userLogin)

/************ open route  *********/
router.get('/getblog', getBlog)
router.get('/getblogbyid/:BlogId', getBlogById)

/******************protected route only authentic user can access ********/
router.post('/createBlog', authenticate, createBlog)
router.post('/update/:BlogId', authenticate, updateBlog)
router.post('/delete/:BlogId', authenticate, deleteBlog)


module.exports = router
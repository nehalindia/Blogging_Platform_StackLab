const express = require('express')
const router = express.Router()

const { createBlog,getBlog,getBlogById,updateBlog,deleteBlog } = require('../controller/blogcontroller')
const { registerUser, userLogin } = require('../controller/usercontroller')
const { authenticate } = require('../middelware/authentication')

router.post('/signup', registerUser)
router.post('/login', userLogin)

router.post('/createBlog', authenticate, createBlog)
router.get('/getblog', getBlog)
router.get('/getblogbyid', getBlogById)
router.post('/update', authenticate, updateBlog)
router.post('/delete', authenticate, deleteBlog)

module.exports = router
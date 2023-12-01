const express = require('express')
const router = express.Router()

const { createBlog,getBlog,getBlogById,updateBlog,deleteBlog } = require('../controller/blogcontroller')

router.post('/createBlog', createBlog)
router.get('/getblog', getBlog)
router.get('/getblogbyid', getBlogById)
router.post('/update', updateBlog)
router.post('/delete', deleteBlog)

module.exports = router
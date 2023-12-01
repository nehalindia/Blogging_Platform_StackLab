// const userModel = require('../model/blogModel')
const blogModel = require('../model/blogModel')
const { isValid,isValidRequestBody } = require('../validation/validator');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


/********* Creating a new Blog *************/
const createBlog = async function(req,res){
    try{
        /**********  Checking null value and undefined value************/
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }

        let {tittle, body, category} = req.body
        if( !isValid(tittle) || !isValid(body) || !isValid(category) ){
            return res.status(400).send({
                status: false,
                message : "Enter valid detail"
            })
        }

        /***************** Adding authorId *************/
        req.body.authorId = req.userId


        /***************** Sending data to DataBase *************/
        const user = await blogModel.create(req.body)
        res.status(201).send({
            status: true,
            message: "Blog Created Successfully",
            data: user
        })
    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


const getBlog = async function(req,res){
    try{
        /***************** AllBlog *************/ 
        const blogs = await blogModel.find()

        res.status(200).send({
            status : true,
            message: " All listed Blogs", 
            data : blogs
          })
    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


const getBlogById = async function(req,res){
    try{
       /***************** Searching Blog by Id *************/
       let { BlogId } = req.params
       if(!isValid(BlogId) || !ObjectId.isValid(BlogId)){
           return res.status(400).send({
               status: false,
               message: "Enter valid BlogId"
           })
       }
        
        const blog = await blogModel.findById(BlogId)
        res.status(200).send({
            status : true,
            message: "Blog", 
            data : blog
          })

    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


const updateBlog = async function(req,res){
    try{

    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


const deleteBlog = async function(req,res){
    try{

    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
} 

module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    updateBlog,
    deleteBlog
}
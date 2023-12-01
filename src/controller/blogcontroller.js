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


/***************** AllBlog *************/ 
const getBlog = async function(req,res){
    try{
        const blogs = await blogModel.find({isDeleted : false})

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


/***************** Searching Blog by Id *************/
const getBlogById = async function(req,res){
    try{
        // validating the params value
        let { BlogId } = req.params
       
        if(!isValid(BlogId) || !ObjectId.isValid(BlogId)){
           return res.status(400).send({
               status: false,
               message: "Enter valid BlogId"
           })
        }
        
        const blog = await blogModel.findOne({_id:BlogId, isDeleted : false})
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


/********************* updateing the blog ***************/
const updateBlog = async function(req,res){
    try{
        // validating the params value
        let { BlogId } = req.params
        // console.log(BlogId)
        if(!isValid(BlogId) || !ObjectId.isValid(BlogId)){
            return res.status(400).send({
                status: false,
                message: "Enter valid BlogId"
            })
        }

        const blog = await blogModel.findOne({_id : BlogId, isDeleted : false})
        if(!blog){
            return res.status(404).send({
                status: false,
                message: "blog not Found"
            })
        }

        // checking user authorization
        if(blog.authorId != req.userId){
            return res.status(403).send({
                status:false, 
                message: "Unauthorized"
            })
        }

        // validating and updateing data
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }
    
        let {tittle, body, category} = req.body
        if(tittle){
            if(!isValid(tittle)){
                return res.status(400).send({
                    status: false,
                    message: "provide valid title"
                })
            }
            blog.tittle = tittle
        }

        if(body){
            if(!isValid(body)){
                return res.status(400).send({
                    status: false,
                    message: "provide valid body"
                })
            }
            blog.body = body
        }

        if(category){
            if(!isValid(category)){
                return res.status(400).send({
                    status: false,
                    message: "provide valid category"
                })
            }
            blog.category = category
        }

        // sending updated data to database
        let data  = await blog.save()
        res.status(200).send({
            status: true,
            message: "blog Updated",
            data : data
        })

    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


/********************* deleteing the blog *************/
const deleteBlog = async function(req,res){
    try{
        // validating the params value
        let { BlogId } = req.params
        // console.log(BlogId)
        if(!isValid(BlogId) || !ObjectId.isValid(BlogId)){
            return res.status(400).send({
                status: false,
                message: "Enter valid BlogId"
            })
        }

        const blog = await blogModel.findOne({_id : BlogId, isDeleted : false})
        if(!blog){
            return res.status(404).send({
                status: false,
                message: "blog not Found"
            })
        }

        // checking user authorization
        if(blog.authorId != req.userId){
            return res.status(403).send({
                status:false, 
                message: "Unauthorized"
            })
        }

        blog.isDeleted = true
        
        let data  = await blog.save()
        res.status(200).send({
            status: true,
            message: "blog deleted",
            // data : data
        })

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
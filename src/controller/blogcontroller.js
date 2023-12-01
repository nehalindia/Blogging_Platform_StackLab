const userModel = require('../model/blogModel')
const { isValid,isValidRequestBody } = require('../validation/validator');


const createBlog = async function(req,res){
    try{

        
    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


const getBlog = async function(req,res){
    try{

    }catch(error){
        res.status(500).send({
            status : false,
            message : error.message
        })
    }
}


const getBlogById = async function(req,res){
    try{

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
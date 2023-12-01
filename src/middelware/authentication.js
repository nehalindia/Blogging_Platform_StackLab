const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken')
require('dotenv').config


/*********************** authenticate Api only allow signin user ***********************/
const authenticate = async function(req,res,next){
    try {

        if(!req.headers.authorization) {
            return res.status(400).send({
                status: false, 
                message: "Header is not present"
            })
        }
        
        let Token = req.headers.authorization.split(" ")[1]
        if(!Token) {return res.status(400).send({status: false, message: "Token is not present" })}

        /******************* Verifying the token ****************/
        jwt.verify(Token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if(err){return res.status(403).send({status:false,message:"Invalid token! author"}) }
        // if(!decode){return res.status(401).send({status:false, message: "Token is not valid"})}
            else{
                req.userId = decoded.userId
                next()
            }
        });
    } catch (error) {
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


/****************** log incoming request ****************/
const requestlog = async function(req,res,next){
    try{
        console.log("Incoming Request Info:-")
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${req.hostname}`);
        next();

    }catch (error) {
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

module.exports = {
    authenticate,
    requestlog
}
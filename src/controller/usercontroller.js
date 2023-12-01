const userModel = require('../model/userModel')
const { isValid,isValidRequestBody } = require('../validation/validator');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config
const bcrypt= require("bcrypt")


/********* User Registeration API*************/
const registerUser = async function(req,res){
    try{
        /**********  Checking null value and undefined value************/
        // console.log(req.body)
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }

        let {name, email, password} = req.body
        if( !isValid(name) || !isValid(email) || !isValid(password) ){
            return res.status(400).send({
                status: false,
                message : "Enter valid detail"
            })
        }


        /*****************Validating password length*************/
        password = password.trim()
        if(password.length < 8 || password.length > 15){
            return res.status(400).send({
                status: false,
                message: "Password length must between 8 to 15"
            })
        }


        /***************** encrypting password and name *************/
        const salt = await bcrypt.genSalt(5);

        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const hashedName = await bcrypt.hash(name, salt);
        req.body.name = hashedName;


        /*****************Validatin email using validator Package,
         also checked in DB to maintain uniqness of user *************/
        email = email.trim()
        if(!validator.isEmail(email)){
            return res.status(400).send({
                status : false,
                message : "Enter valid email"
            })
        }

        const emailExist = await userModel.findOne({email})     
        if(emailExist){
            return res.status(400).send({
              status : false, 
              message : "email already registerd" 
            })
        }

        const user = await userModel.create(req.body)

        res.status(201).send({
            status: true,
            message: "user Register successfully",
            data: user
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}


/************* USer Login API *****************/
const userLogin = async (req, res) => {
    try{
         /**********  Checking null value and undefined value************/
        if(!isValidRequestBody(req.body)){
            return res.status(400).send({status :false, message: "Must add data"})
        }
        
        let {email, password}= req.body
        
        if(!isValid(email) || !isValid(password)){
            return res.status(400).send({
                status: false,
                message: "please provide valid email and password"
            })
        }


         /*****************Validating Phone Number using validator Package*************/
        if(!validator.isEmail(email)){
            return res.status(400).send({
                status : false,
                message : "Enter valid email"
            })
        }

        /*******Checked user and created token for user***********/
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
              status : false, 
              message : "user Not Registerd" 
            })
        }


        let match= bcrypt.compareSync(password, user.password)
        if(!match){
            return res.status(401).send({
                status : false, 
                message : "invalid password" 
            })
        }


        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET_KEY,{expiresIn : "1d"},
        {iat : Date.now()})
        
        res.status(200).send({
          status : true,
          message: "user login successful", 
          data : {
            userId: user._id,
            token: token
            } 
        })

    }catch(error){
        res.status(500).send({
            status : false, 
            message : error.message
        })
    }
}

module.exports = {
    registerUser,
    userLogin,

}
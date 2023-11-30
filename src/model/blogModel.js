const mongoose = require('mongoose')

const blogschema = new mongoose.Schema( { 
    tittle : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    author_name : {
        type : String,
        required : true
    },
    category : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps : true })

module.exports = mongoose.model('blog', blogschema)
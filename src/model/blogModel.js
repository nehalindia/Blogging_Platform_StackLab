const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogschema = new mongoose.Schema( { 
    tittle : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId : {
        type : ObjectId,
        ref : 'user',
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
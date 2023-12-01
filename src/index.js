const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const route = require('./route/route')
const { requestlog } = require('../src/middelware/authentication')

app.use(express.json())
app.use(express.urlencoded( {extended : true} ))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true })
.then(
    console.log(" DataBase Connected")
)
.catch( 
    err => console.log(err.message)
)

app.use('/',requestlog)
app.use('/', route)

app.listen( process.env.PORT, () => {
    console.log(`Blogging_App is runing on ${process.env.PORT}`)
})
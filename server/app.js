if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
const router = require('./router')
const express = require('express')
const PORT = process.env.PORT
const cors = require('cors')

const app = express()

mongoose.connect(process.env.MONGODBATLAS, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log('connect to mongodb atlas')
    }
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', router)
app.use(errorHandler)

app.listen(PORT, _ => console.log(`running on port ${PORT}`))



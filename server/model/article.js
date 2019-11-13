const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema({
    UserId : {
        type: Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type: String,
        required: [true, 'required title']
    },
    content : {
        type: String,
        required: [true, 'required content']
    },
    tags : {
        type: Array
    },
    image : {
        type: String,
        required: [true, 'required cover image']
    }
}, {timestamps : true})

const Model = mongoose.model('article', Article)
module.exports = Model
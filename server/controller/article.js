const Article = require('../model/article')

class Controller {
    static create(req,res,next){
        console.log('masuk controller')
        console.log(req.body)
        console.log(req.file.cloudStoragePublicUrl)
        if(!req.file || !req.body.tags || !req.body.content || !req.body.title){
            next({ name : 'CreateError'})
        }
        let create = {
            title: req.body.title,
            content: req.body.content,
            image: req.file.cloudStoragePublicUrl,
            tags : req.body.tags.split(' ,'),
            UserId : req.loggedUser._id
        }
        Article.create(create)
        .then( created => {
            console.log(created)
            res.status(201).json(created)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Article.deleteOne({ _id : req.body._id, UserId : req.loggedUser._id })
        .then( deletedData => res.status(200).json({message : 'successfuly deleted article'}))
        .catch(next)
    }

    static patch(req,res,next){
        let patch
        if(req.file) {
            patch = {
                title: req.body.title,
                content: req.body.content,
                image: req.file.cloudStoragePublicUrl,
                tags : req.body.tags.split(',')
            }
        } else {
            patch = {
                title: req.body.title,
                content: req.body.content,
                tags : req.body.tags.split(',')
            }
        }
        Article.findByIdAndUpdate( {_id : req.body._id} , patch)
        .then( beforeUpdated => res.status(200).json({ message: 'successfully patch file'}))
        .catch(next)
    }

    static findOne(req,res,next){
        Article.findById(req.body._id)
        .then( article => res.status(200).json(article))
        .catch(next)
    }
    
    static find(req,res,next){
        let search = new RegExp(req.headers.search)
        Article.find({
            $or : [
                { "title" : {
                    $regex : search,
                    $options: 'i'
                }},
                { "content" : {
                    $regex : search,
                    $options: 'i'
                }},
                { "tags" : {
                    $regex : search,
                    $options: 'i'
                }}
            ]
        }).populate('UserId')
        .then( articles => res.status(200).json(articles))
        .catch(next)
    }

    static search(req,res,next){
        
        
        let search = new RegExp(req.headers.search)

        Article.find({
            UserId : req.loggedUser._id,
            $or : [
                { "title" : {
                    $regex : search,
                    $options: 'i'
                }},
                { "content" : {
                    $regex : search,
                    $options: 'i'
                }},
                { "tags" : {
                    $regex : search,
                    $options: 'i'
                }}
            ]
        })
        .populate(['user'])
        .then( result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = Controller
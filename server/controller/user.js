const User = require('../model/user')
const { hash } = require('../helpers/bycript')
const { compare } = require('../helpers/bycript')
const { generateToken } = require('../helpers/jwt')


class Controller {
    static create(req,res,next){
        User.create({
            username: req.body.username,
            email : req.body.email,
            password : hash(req.body.password)
        })
        .then( createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(next)
    }
    static login(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then( user => {
            if(!user)next({ name: 'LoginError' })
            else if(!compare(req.body.password, user.password))next({ name: 'LoginError' })
            else {
                let payload = {
                    _id : user._id,
                    email : user.email,
                    username : user.username
                }
                let token = generateToken(payload)
                res.status(200).json({token , id : user._id})
            }  
        })
        .catch(next)
    }
    static google(req,res,next){
        User.findOne({
            email: req.body.email
        })
        .then( user => {
            if(!user){
                return  User.create({
                    username: req.body.username,
                    email : req.body.email,
                    password : hash(req.body.password)
                })
            } else {
                return user
            }
        })
        .then ( user => {
            let payload = {
                _id : user._id,
                email : user.email,
                username : user.username
            }
            let token = generateToken(payload)
            res.status(200).json({ token, _id : user._id })
        })
        .catch(next)
    }
}

module.exports = Controller
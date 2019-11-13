const router = require('express').Router()
const Controller = require('../controller/user')


router.post('/register', Controller.create)
router.post('/login', Controller.login)
router.post('/google', Controller.google)



module.exports = router
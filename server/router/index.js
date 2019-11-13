const router = require('express').Router()
const articles = require('./article')
const user = require('./user')

router.use('/article', articles)
router.use('/user', user)

module.exports = router
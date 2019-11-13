const router = require('express').Router()
const Controller = require('../controller/article')
const { authentication } = require('../middlewares/auth')
const multer = require('../helpers/multer')


router.post('/' , authentication , multer.multer.single('image'), multer.sendUploadToGCS , Controller.create)
router.delete('/', authentication , Controller.delete)
router.patch('/', authentication , multer.multer.single('image'), multer.sendUploadToGCS ,Controller.patch)
router.get('/', Controller.find)
router.get('/search', authentication ,Controller.search)



module.exports = router

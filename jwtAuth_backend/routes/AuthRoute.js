const {signUp,login} = require('../controllers/AuthController')
const {userVerification} = require('../middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/signup',signUp)
router.post('/login',login)


router.post('/',userVerification)

module.exports = router
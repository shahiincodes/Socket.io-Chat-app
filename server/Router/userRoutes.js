const express = require ('express')
const { register, logIn } = require('../Controllers/userControllers')
const router = express.Router()


router.post('/register',register)
router.post('/logIn',logIn)


module.exports = router;
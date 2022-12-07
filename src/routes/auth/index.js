const { Router } = require('express')
const authController = require('@controllers/authController')
const isLoggedIn = require('@middlewares/isLoggedIn')

const router = Router()

router
	.route('/')
	.get(isLoggedIn, authController.authorize)
	.post(authController.authenticate)
	.delete(authController.logOut)

module.exports = router

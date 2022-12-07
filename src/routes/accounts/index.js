const { Router } = require('express')
const accountController = require('@controllers/accountController')
const isLoggedIn = require('@middlewares/isLoggedIn')

const router = Router()

router.route('/me').get(isLoggedIn, accountController.getMe)

module.exports = router

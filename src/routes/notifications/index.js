const { Router } = require('express')
const notificationsController = require('@controllers/notificationController')
const isLoggedIn = require('@middlewares/isLoggedIn')

const router = Router()

router.route('/').get(isLoggedIn, notificationsController.getNotifications)

module.exports = router

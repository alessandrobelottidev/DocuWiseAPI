const { Router } = require('express')
const notificationsController = require('@controllers/notificationController')
const isLoggedIn = require('@middlewares/isLoggedIn')

const router = Router()

router
	.route('/:quantity')
	.get(isLoggedIn, notificationsController.getNotifications)

router
	.route('/read/:id')
	.patch(isLoggedIn, notificationsController.readNotification)

module.exports = router

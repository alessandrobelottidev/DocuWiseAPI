const { Op } = require('sequelize')
const Notifications = require('@root/src/models/Notification')

exports.getNotifications = async (req, res) => {
	let notifications = await Notifications.findAll({
		where: {
			accountId: req.session.accountId,
			read: false,
		},
	})

	if (notifications === null) notifications = []

	res.status(200).json(notifications)
}

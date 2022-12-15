const { Op } = require('sequelize')
const getAccountId = require('@utils/getAccountId')
const Notifications = require('@root/src/models/Notification')

exports.getNotifications = async (req, res) => {
	let accountId = await getAccountId(res, req.session.username)
	const quantity = req.params.quantity

	let notifications = await Notifications.findAll({
		where: { accountId },
		//limit: quantity,
		order: [['createdAt', 'DESC']],
	})

	if (notifications === null) notifications = []

	res.status(200).json(notifications)
}

exports.createNotification = async (req, res) => {
	let accountId = await getAccountId(res, req.session.username)

	const { title, body, type, read } = req.body

	const notification = await Notifications.create({
		accountId,
		title,
		body,
		type,
		read,
	})

	if (notification === null)
		return res.status(400).json({ message: 'Cannot create notification' })

	res.status(200).json(notification)
}

exports.readNotification = async (req, res) => {
	let accountId = await getAccountId(res, req.session.username)

	const { id } = req.params

	const notification = await Notifications.update(
		{ read: true },
		{ where: { id, accountId } },
	)

	if (notification === null)
		return res.status(400).json({ message: 'Cannot update notification' })

	res.status(200).json({ message: 'Notification updated' })
}

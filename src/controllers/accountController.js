const Account = require('@models/Account')
const { Op } = require('sequelize')

exports.getMe = async (req, res) => {
	let account = await Account.findOne({
		attributes: {
			exclude: ['password', 'createdAt', 'updatedAt'],
		},
		where: {
			username: req.session.username,
		},
	})

	if (account === null)
		return res
			.status(404)
			.json({ message: "The requested account doesn't exist" })

	res.status(200).json(account)
}

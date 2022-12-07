const { Op } = require('sequelize')
const Invoice = require('@models/Invoice')
const getAccountId = require('@utils/getAccountId')

exports.getAll = async (req, res) => {
	let accountId = await getAccountId(res, req.session.username)

	let invoices = await Invoice.findAll({ where: { accountId } })

	if (invoices === null)
		return res
			.status(404)
			.json({ message: "The requested invoices don't exist" })

	res.status(200).json(invoices)
}

exports.getAllFromTo = async (req, res) => {
	let start = req.params.start
	let end = req.params.end

	let accountId = await getAccountId(res, req.session.username)

	let invoices = await Invoice.findAll({
		where: {
			data: {
				[Op.and]: {
					[Op.gte]: start,
					[Op.lte]: end,
				},
			},
			accountId,
		},
	})

	if (invoices === null)
		return res
			.status(404)
			.json({ message: "The requested invoices don't exist" })

	res.status(200).json(invoices)
}

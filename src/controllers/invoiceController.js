const Account = require('@models/Account')
const Invoice = require('@models/Invoice')
const getAccountId = require('@utils/getAccountId')
const ifNull404 = require('@utils/ifNull404')
const { generate } = require('@utils/generate')
const { getFileUrlFromS3 } = require('@services/s3')

exports.get = async (req, res) => {
	let accountId = await getAccountId(res, req.session.username)

	let invoice = await Invoice.findOne({
		where: { accountId, id: req.params.id },
	})

	if (invoice === null)
		return res
			.status(404)
			.json({ message: "The requested invoice doesn't exist" })

	res.status(200).json(invoice)
}

exports.create = async (req, res) => {
	let {
		numeroFattura,
		nominativo,
		data,
		indirizzoResidenza,
		capResidenza,
		cittaResidenza,
		pIva,
		codFiscale,
		tipo,
		lavoroSvolto,
		totale,
		theme,
	} = req.body

	let accountId = await getAccountId(res, req.session.username)

	return await Invoice.create({
		numeroFattura,
		nominativo,
		data,
		indirizzoResidenza,
		capResidenza,
		cittaResidenza,
		pIva,
		codFiscale,
		tipo,
		lavoroSvolto,
		totale,
		theme,
		accountId,
	})
		.then((invoice) => {
			if (!invoice) {
				console.log(invoice)
				res.status(500).json({ message: 'Internal server error' })
			}

			res.status(200).json({ message: 'Invoice created successfully' })
		})
		.catch((err) => {
			console.log(err.errors)
			res.status(400).end()
		})
}

exports.delete = async (req, res) => {
	let deleted = await Invoice.destroy({ where: { id: req.params.id } })

	if (!deleted)
		return res.status(404).json({
			message: 'The provided invoice id is not present in the database',
		})

	return res.status(200).json({ message: 'Invoiced deleted successfully' })
}

exports.download = async (req, res) => {
	// Get account
	let account = await Account.findOne({
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		where: { username: req.session.username },
	})

	// Check if user exists
	ifNull404(account)

	// Get invoice
	let invoice = await Invoice.findOne({
		where: { accountId: account.id, id: req.params.id },
	})

	// Check if invoice exits
	ifNull404(invoice)

	// TODO: Generate PDF file
	// if (invoice.uuidPdf === null)

	const url = await getFileUrlFromS3(invoice.uuidPdf)

	if (!url) return res.status(501).json({ message: 'Internal server error' })

	return res.status(200).json(url)
}

exports.view = async (req, res) => {
	// Get account
	let account = await Account.findOne({
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		where: { username: req.session.username },
	})

	// Check if user exists
	ifNull404(account)

	// Get invoice
	let invoice = await Invoice.findOne({
		where: { accountId: account.id, id: req.params.id },
	})

	// Check if invoice exits
	ifNull404(invoice)

	// TODO: Generate PDF file
	// if (invoice.uuidPdf === null)

	const url = await getFileUrlFromS3(invoice.uuidPreview)

	if (!url) return res.status(501).json({ message: 'Internal server error' })

	return res.status(200).json(url)
}

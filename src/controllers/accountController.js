const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const Account = require('@models/Account')
const Notification = require('@models/Notification')
const getAccountId = require('@utils/getAccountId')

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

exports.createAccount = async (req, res) => {
	// Get username and password from the request body
	let username = req.body.username
	let email = req.body.email
	let password = req.body.password

	// Check that both username and password were provided
	if (!username || !password || !email)
		return res.status(400).json({
			message: 'Username and/or password not received or wrong encoding',
		})

	// Check that the username is not already taken
	let account = await Account.findOne({
		where: {
			[Op.or]: {
				username: { [Op.eq]: username },
				email: { [Op.eq]: email },
			},
		},
	})

	// If the username is already taken, return an error
	if (account !== null)
		return res.status(409).json({ message: 'Username or email already taken' })

	// Encrypt the password using bcrypt
	password = await bcrypt.hash(password, 10)

	// Create the account
	account = await Account.create({
		username,
		password,
		email,
		isCompleted: false,
	})

	// Create notification for the new account
	let accountId = await getAccountId(res, username)
	const title = 'Benvenuto su DocuWise!'
	const body = 'Completa il tuo profilo'

	// Create the notification
	let notification = await Notification.create({
		title,
		body,
		accountId: accountId,
		hasAction: true,
		actionUrl: '/update-account',
	})

	// If the notification was not created, return an internal server error
	if (notification === null)
		return res.status(500).json({ message: 'Internal server error' })

	// Notify the user that the account was created
	res.status(201).json({ message: 'Account created' })
}

exports.updateAccountInfo = async (req, res) => {
	let {
		nomeAzienda,
		indirizzoResidenzaFiscale,
		indirizzoResidenzaCitta,
		pIva,
		urlProfilo,
	} = req.body

	if (
		!nomeAzienda ||
		!indirizzoResidenzaFiscale ||
		!indirizzoResidenzaCitta ||
		!pIva ||
		!urlProfilo
	)
		return res.status(400).json({
			message: 'Missing fields',
		})

	let account = await Account.findOne({
		where: {
			username: req.session.username,
		},
	})

	if (account === null)
		return res
			.status(404)
			.json({ message: "The requested account doesn't exist" })

	if (account.isCompleted)
		return res.status(409).json({ message: 'Account already completed' })

	account.update({
		nomeAzienda,
		indirizzoResidenzaFiscale,
		indirizzoResidenzaCitta,
		pIva,
		urlProfilo,
		isCompleted: true,
	})

	res.status(201).json({ message: 'Account updated' })
}

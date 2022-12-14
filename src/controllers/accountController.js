const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const Account = require('@models/Account')

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
	account = await Account.create({ username, password, email })

	// Notify the user that the account was created
	res.status(201).json({ message: 'Account created' })
}

const bcrypt = require('bcrypt')
const Account = require('@models/Account')

exports.authenticate = async (req, res) => {
	let username = req.body.username
	let password = req.body.password

	// Check that both username and password were provided
	if (!username || !password)
		return res.status(400).json({
			message: 'Username and/or password not received or wrong encoding',
		})

	// Query db to find the hashed password of the associated account
	let account = await Account.findOne({
		attributes: ['password'],
		where: { username },
	})

	// Check that the provided user exists in the database
	if (account === null)
		return res
			.status(404)
			.json({ message: "The requested account doesn't exist" })

	const dbPassword = account.password
	const passwordsMatch = await bcrypt.compare(password, dbPassword)

	// Check if the passwords Match
	if (!passwordsMatch) return res.status(200).json({ loggedIn: false })

	// Authenticate user's session
	req.session.loggedIn = true
	req.session.username = username

	return res.status(200).json({ loggedIn: true })
}

exports.authorize = async (req, res) => {
	return res.status(200).send({ loggedIn: true })
}

exports.logOut = async (req, res) => {
	req.session = null
	return res.status(200).json({ message: 'You logged out successfully' })
}

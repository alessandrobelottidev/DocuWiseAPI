const Account = require('@models/Account')

const getAccountId = async (res, username) => {
	if (username === undefined)
		return res.status(400).json({ message: 'There is no associated user' })

	let account = await Account.findOne({
		where: { username },
	})

	// Check that the provided user exists in the database
	if (account === null)
		return res
			.status(404)
			.json({ message: "The requested account doesn't exist" })

	return account.id
}

module.exports = getAccountId

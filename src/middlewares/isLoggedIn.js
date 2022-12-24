const isLoggedIn = (req, res, next) => {
	console.log(req.session)
	if (req.session.loggedIn) next()
	else return res.status(401).json({ message: 'You need to be authenticated' })
}

module.exports = isLoggedIn

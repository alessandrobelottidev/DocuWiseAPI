const ifNull404 = async (resource, res) => {
	if (resource === null)
		return res
			.status(404)
			.json({ message: "The requested resource doesn't exist" })
}

module.exports = ifNull404

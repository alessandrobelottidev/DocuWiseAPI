const Sequelize = require('sequelize')
const dotenv = require('dotenv')

// Load env variables
dotenv.config()

const db = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		dialect: 'mysql',
	},
)

db.sync({ alter: true })

module.exports = db

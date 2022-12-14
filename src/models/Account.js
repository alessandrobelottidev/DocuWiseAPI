const Sequelize = require('sequelize')
const db = require('@services/db')
const Invoice = require('@models/Invoice')
const Notification = require('@models/Notification')

const { DataTypes } = Sequelize

const Account = db.define('account', {
	username: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: 'username',
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	nomeAzienda: {
		type: DataTypes.STRING(256),
		allowNull: true,
	},
	indirizzoResidenzaFiscale: {
		type: DataTypes.STRING(256),
		allowNull: true,
	},
	indirizzoResidenzaCitta: {
		type: DataTypes.STRING(256),
		allowNull: true,
	},
	pIva: {
		type: DataTypes.STRING(11),
		allowNull: true,
	},
	urlProfilo: {
		type: DataTypes.STRING(512),
		allowNull: true,
		defaultValue:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png',
	},
	isCompleted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
})

Account.hasMany(Invoice)
Account.hasMany(Notification)

module.exports = Account

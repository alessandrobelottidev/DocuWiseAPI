const { DataTypes } = require('sequelize')
const db = require('@services/db')

const Notifications = db.define('notification', {
	title: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	body: {
		type: DataTypes.STRING(1024),
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING(256),
		allowNull: false,
		defaultValue: 'default',
	},
	hasAction: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	actionUrl: {
		type: DataTypes.STRING(512),
		allowNull: true,
	},
	read: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
})

Notifications.associate = (models) => {
	Notifications.belongsTo(models.account)
}

module.exports = Notifications

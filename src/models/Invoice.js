const Sequelize = require('sequelize')
const db = require('@services/db')

const { DataTypes } = Sequelize

const Invoice = db.define('invoice', {
	nominativo: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	data: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	indirizzoResidenza: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	capResidenza: {
		type: DataTypes.STRING(5),
		allowNull: false,
	},
	cittaResidenza: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	pIva: {
		type: DataTypes.STRING(11),
		allowNull: true,
	},
	codFiscale: {
		type: DataTypes.STRING(16),
		allowNull: true,
	},
	tipo: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	lavoroSvolto: {
		type: DataTypes.STRING(1024),
		allowNull: false,
	},
	totale: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	theme: {
		type: DataTypes.STRING(256),
		allowNull: false,
	},
	numeroFattura: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
	},
	uuidPdf: {
		type: DataTypes.STRING(512),
		allowNull: true,
	},
	uuidPreview: {
		type: DataTypes.STRING(512),
		allowNull: true,
	},
})

Invoice.associate = (models) => {
	Invoice.belongsTo(models.account)
}

module.exports = Invoice

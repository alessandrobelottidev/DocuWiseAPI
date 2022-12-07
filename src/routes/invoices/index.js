const { Router } = require('express')
const invoiceController = require('@controllers/invoiceController')
const invoicesController = require('@controllers/invoicesController')
const isLoggedIn = require('@middlewares/isLoggedIn')

const router = Router()

router
	.route('/')
	.get(isLoggedIn, invoicesController.getAll)
	.post(isLoggedIn, invoiceController.create)

router
	.route('/:id')
	.get(isLoggedIn, invoiceController.get)
	.delete(isLoggedIn, invoiceController.delete)

router.route('/view/:id').get(isLoggedIn, invoiceController.view)

router.route('/download/:id').get(isLoggedIn, invoiceController.download)

router.route('/:start/:end').get(isLoggedIn, invoicesController.getAllFromTo)

module.exports = router

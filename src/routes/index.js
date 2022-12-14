const { Router } = require('express')
const accountsRoutes = require('@routes/accounts/index.js')
const invoicesRoutes = require('@routes/invoices/index.js')
const notificationsRoutes = require('@routes/notifications/index.js')
const authRoutes = require('@routes/auth/index.js')

const router = Router()

router.use('/accounts', accountsRoutes)
router.use('/invoices', invoicesRoutes)
router.use('/notifications', notificationsRoutes)
router.use('/auth', authRoutes)

module.exports = router

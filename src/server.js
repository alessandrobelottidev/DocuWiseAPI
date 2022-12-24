// Make use of aliases
require('module-alias/register')

const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
const routes = require('@routes/index')

const app = express()
const port = process.env.PORT || 3000

const allowedOriginsList = process.env.CORS_ORIGIN.split(',')

const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOriginsList.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
}

const cookieSessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	maxAge: 24 * 60 * 60 * 1000 * 31, // 31 days
}

// Middlewares
app.use(cors(corsOptions))
app.use(cookieSession(cookieSessionOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// If a route doesn't exist
app.use((req, res, next) => {
	res.status(404).json({
		message: "The requested API endpoint doesn't exist",
	})
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

// Make use of aliases
require('module-alias/register')

const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')
const routes = require('@routes/index')

const app = express()
const port = process.env.PORT || 3000

app.set("trust proxy", 1)

const allowedOriginsList = process.env.CORS_ORIGIN.split(',')

console.log(allowedOriginsList)

const corsOptions = {
	origin: allowedOriginsList,
	credentials: true,
}

const cookieSessionOptions = {
	name: 'session',
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	sameSite: 'None',
	httpOnly: true,
	secure: true,
	maxAge: 24 * 60 * 60 * 1000 * 31,
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

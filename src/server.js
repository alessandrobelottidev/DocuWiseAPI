// Make use of aliases
require('module-alias/register')

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const routes = require('@routes/index')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = { origin: process.env.CORS_ORIGIN, credentials: true }
const sessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
}

// Middlewares
app.use(cors(corsOptions))
app.use(session(sessionOptions))
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

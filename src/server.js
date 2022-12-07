// Make use of aliases
require('module-alias/register')

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const routes = require('@routes/index')

const app = express()
const interface = process.env.LISTEN_INTERFACE
const port = process.env.LISTEN_PORT

const corsOptions = { origin: 'http://localhost:5173', credentials: true }
const sessionOptions = {
	secret: 'secret',
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

app.listen(port, interface)

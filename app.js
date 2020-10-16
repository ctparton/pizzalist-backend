const express = require('express')
const app = express()
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./controllers/users')
const pizzaRouter = require('./controllers/pizzas')
const loginRouter = require('./controllers/login')
const opencageRouter = require('./controllers/opencage')
const config = require('./utils/config.js')
const customMiddleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => logger.info(`Successfully connected to ${mongoUrl}`))


app.use(cors())
app.use(express.json())
app.use(customMiddleware.tokenValidator)
app.use('/api/users', userRouter)
app.use('/api/pizzas', pizzaRouter)
app.use('/api/login', loginRouter)
app.use('/api/opencage', opencageRouter)


if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}
app.use(customMiddleware.errorHandler)

module.exports = app
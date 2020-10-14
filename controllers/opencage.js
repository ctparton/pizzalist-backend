const opencageRouter = require('express').Router()
const opencage = require('opencage-api-client');
require('dotenv').config()
require('express-async-errors');

opencageRouter.post('/', async (req, res) => {
    const body = req.body.location
    console.log(body)
    opencage
        .geocode({ q: req.body.location})
        .then((data) => {
            return res.json(data)
        })
        .catch((error) => {
            console.log('error', error.message);
        });
})

module.exports = opencageRouter

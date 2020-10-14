const pizzaRouter = require('express').Router()
const Pizza = require('../models/Pizza')
require('express-async-errors');
pizzaRouter.get('/', async (req, res) => {
    const pizzas = await Pizza.find({})
    res.json(pizzas)
})

pizzaRouter.post('/', async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).send("no body provided")
    }
    const pizza = new Pizza({...body})
    const response = await pizza.save()
    res.json(response)
})

module.exports = pizzaRouter

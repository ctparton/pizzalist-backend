const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const pizzaSchema = mongoose.Schema({
    pizza: {type: String, required: true},
    city: {type: String, required: true},
    place: {type: String, required: true},
    coordinates: [
        { type: mongoose.Schema.Types.Decimal128}
    ],
    toppings: [
        { type: String}
    ],
    rating: Number,
    rated_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

pizzaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})
module.exports = mongoose.model('Pizza', pizzaSchema)
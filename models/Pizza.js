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
    created_by: {type: mongoose.Schema.Types.ObjectId},
    rated_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, {timestamps: { createdAt: 'created_at' }})

pizzaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})
module.exports = mongoose.model('Pizza', pizzaSchema)
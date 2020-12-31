const mongoose = require('mongoose');
const { Schema } = mongoose;
const productsScehma = require('./Products')

const salesSchema = new Schema({

    Products: [productsScehma],
    TotalPrice: Number,
    Date: Date


}, { timestamps: { createdAt: 'dateOfAdded' } })

mongoose.model('Sales', salesSchema,'Sales');
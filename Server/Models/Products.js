const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema({

    Name: String,
    Price: String,


}, { timestamps: { createdAt: 'dateOfAdded' } })

mongoose.model('Products', productsSchema,'Products');
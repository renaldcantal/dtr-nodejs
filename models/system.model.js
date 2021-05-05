const mongoose = require('mongoose');

var inventorySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    address: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    itemName: {
        type: String
    },
    unitPrice: {
        type: Number
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    }
});

mongoose.model('Inventory', inventorySchema);
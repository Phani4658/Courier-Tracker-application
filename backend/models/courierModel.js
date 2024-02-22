const mongoose = require('mongoose');

const courierSchema = new mongoose.Schema({
    trackingNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'],
        default: 'Shipped'
    },
    location: {
        type: String,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Courier = mongoose.model('Courier', courierSchema);

module.exports = Courier;

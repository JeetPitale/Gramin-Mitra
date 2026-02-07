const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmerName: {
        type: String,
        required: true
    },
    wholesalerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wholesalerName: {
        type: String,
        required: true
    },
    cropListingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CropListing',
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ['kg', 'quintal', 'ton'],
        default: 'kg'
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryType: {
        type: String,
        enum: ['Delivery', 'Pickup'],
        default: 'Delivery'
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    location: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);

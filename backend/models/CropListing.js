const mongoose = require("mongoose");

const cropListingSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmerName: {
        type: String,
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
    truckNetWeight: {
        type: Number,
        required: true,
        comment: 'Net weight of truck in kg'
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("CropListing", cropListingSchema);

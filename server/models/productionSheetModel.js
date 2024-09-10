const mongoose = require('mongoose');

const ProductionSheetSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    sheetData: {
        productDetails: [String],
        sizes: [String],
        activationOption: [String],
        qty: [String],
        projectAddress: [String],
        otherDetails: [String],
        sensorType: [String],
        model: [String],
        sensorQty: [String],
        pickUpAddress: [String],
        sensorOtherDetails: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProductionSheet', ProductionSheetSchema);

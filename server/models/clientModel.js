const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientContact: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientBudget: { type: Number, required: true }
});

module.exports = mongoose.model('Client', clientSchema);

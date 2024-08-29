const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/, // Only alphabets and spaces
        trim: true
    },
    projectId: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Za-z0-9]+$/, // Alphanumeric
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/, // Only alphabets and spaces
        trim: true
    },
    clientContact: {
        type: String,
        required: true,
        match: /^[0-9]+$/, // Only numbers
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v instanceof Date && !isNaN(v);
            },
            message: 'Invalid start date'
        }
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v instanceof Date && !isNaN(v);
            },
            message: 'Invalid end date'
        }
    },
    projectManager: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/, // Only alphabets and spaces
        trim: true
    },
    location: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/, // Only alphabets and spaces
        trim: true
    },
    budget: {
        type: Number,
        required: true,
        min: [0, 'Budget must be positive']
    },
    status: {
        type: String,
        default: 'Active'
    }
});

module.exports = mongoose.model('Project', projectSchema);

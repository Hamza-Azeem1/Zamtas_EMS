const Client = require('../models/clientModel');

async function addClientController(req, res) {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json({
            message: "Client added successfully",
            data: newClient,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Server Error',
            error: true,
            success: false
        });
    }
}

async function getClientsController(req, res) {
    try {
        const clients = await Client.find({}, 'clientName clientContact clientAddress clientBudget clientEmail clientContactPerson');
        res.status(200).json({
            message: "Clients fetched successfully",
            data: clients,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Server Error',
            error: true,
            success: false
        });
    }
}

module.exports = {
    addClientController,
    getClientsController
};

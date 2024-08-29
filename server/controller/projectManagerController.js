const ProjectManager = require('../models/projectManagerModel');

async function addProjectManagerController(req, res) {
    try {
        const newManager = new ProjectManager(req.body);
        await newManager.save();
        res.status(201).json({
            message: "Project Manager added successfully",
            data: newManager,
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

async function getProjectManagersController(req, res) {
    try {
        const managers = await ProjectManager.find({}, 'name contact email department');
        res.status(200).json({
            message: "Project Managers fetched successfully",
            data: managers,
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
    addProjectManagerController,
    getProjectManagersController
};

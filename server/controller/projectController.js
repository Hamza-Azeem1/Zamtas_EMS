const Project = require('../models/projectModel');

async function addProjectController(req, res) {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({
            message: "Project added successfully",
            data: newProject,
            success: true,
            error: false
        });
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(400).json({
            message: err.message || 'Validation Error',
            error: true,
            success: false
        });
    }
}

async function getProjectsController(req, res) {
    try {
        const projects = await Project.find({}, 'projectName clientName startDate endDate status');
        res.status(200).json({
            message: "Projects fetched successfully",
            data: projects,
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
    addProjectController,
    getProjectsController
};

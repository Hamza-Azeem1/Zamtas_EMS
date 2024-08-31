const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');

// Add a new task
async function addTaskController(req, res) {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({
            message: 'Task added successfully',
            data: task,
            success: true,
            error: false
        });
    } catch (err) {
        console.error('Error adding task:', err);  // Add this line for more detailed error logging
        res.status(500).json({
            message: err.message || 'Server Error',
            error: true,
            success: false
        });
    }
}


// Get all tasks
async function getTasksController(req, res) {
    try {
        const tasks = await Task.find()
            .populate('project')
            .populate('projectManager')
            .populate('assignedTo');

        console.log('Fetched tasks:', tasks);  // Log fetched tasks

        res.status(200).json({
            message: 'Tasks fetched successfully',
            data: tasks,
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


const getUserTasksController = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming middleware attaches user data to req
        const tasks = await Task.find({ assignedTo: userId })
            .populate('project', 'name') // Only populate project name
            .populate('projectManager', 'name') // Only populate project manager name
            .populate('assignedTo', 'name'); // Only populate assigned user's name

        res.status(200).json({
            message: 'Tasks fetched successfully',
            data: tasks,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch tasks',
            error: true,
            success: false
        });
    }
};


// Get project details by projectId
async function getProjectDetailsController(req, res) {
    try {
        const project = await Project.findById(req.params.projectId)
            .populate('projectManager');
        if (!project) {
            return res.status(404).json({
                message: 'Project not found',
                error: true,
                success: false
            });
        }
        res.status(200).json({
            message: 'Project details fetched successfully',
            data: project,
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
    addTaskController,
    getTasksController,
    getUserTasksController,
    getProjectDetailsController
};

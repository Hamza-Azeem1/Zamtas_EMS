const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUM
const twilioWhatsapp = process.env.TWILIO_WHATSAPP
const client = twilio(accountSid, authToken);

// Add a new task
async function addTaskController(req, res) {
    try {
        const task = new Task(req.body);
        await task.save();

        // Send notifications to all assigned users
        for (const userId of task.assignedTo) {
            const assignedUser = await User.findById(userId);
            if (assignedUser) {
                let mobileNo = assignedUser.mobileNo;

                if (mobileNo && !mobileNo.startsWith('+')) {
                    mobileNo = `+92${mobileNo.slice(1)}`;
                }

                // Send WhatsApp notification
                if (mobileNo) {
                    await client.messages.create({
                        body: `Hello ${assignedUser.name}!. A new task of ${task.category} has been assigned to you. Kindly Login to your Portal using this link: https://zamtas-ems.vercel.app`,
                        from: twilioWhatsapp,
                        to: `whatsapp:${mobileNo}`
                    });
                }
            }
        }

        res.status(201).json({
            message: 'Task added successfully',
            data: task,
            success: true,
            error: false
        });
    } catch (err) {
        console.error('Error adding task:', err);
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
            .populate('assignedTo')
            .populate('teamLead');

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
        const userId = req.user._id;
        const tasks = await Task.find({ assignedTo: userId })
            .populate({
                path: 'project',
                select: 'location',
            })
            .populate('projectManager', 'name')
            .populate('assignedTo', 'name');

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

// Start a task
async function startTaskController(req, res) {
    try {
        const { taskId } = req.body;
        const startImage = req.file;

        if (!startImage) {
            return res.status(400).json({
                message: 'Start image is required',
                error: true,
                success: false
            });
        }

        const result = await cloudinary.uploader.upload(startImage.path);

        const task = await Task.findByIdAndUpdate(taskId, {
            status: 'In Progress',
            startImage: result.secure_url
        }, { new: true });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: 'Task started successfully',
            data: task,
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

// Complete a task
async function completeTaskController(req, res) {
    try {
        const { taskId } = req.body;
        const completeImage = req.file;

        if (!completeImage) {
            return res.status(400).json({
                message: 'Completion image is required',
                error: true,
                success: false
            });
        }

        const result = await cloudinary.uploader.upload(completeImage.path);

        const task = await Task.findByIdAndUpdate(taskId, {
            status: 'Done',
            completeImage: result.secure_url
        }, { new: true });

        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: 'Task completed successfully',
            data: task,
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

async function updateTaskController(req, res) {
    try {
        const { taskId } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true })
            .populate('project')
            .populate('projectManager')
            .populate('assignedTo')
            .populate('teamLead');

        if (!updatedTask) {
            return res.status(404).json({
                message: 'Task not found',
                error: true,
                success: false
            });
        }

        // Send notifications to all assigned users when the task is updated
        for (const userId of updatedTask.assignedTo) {
            const assignedUser = await User.findById(userId);
            if (assignedUser) {
                let mobileNo = assignedUser.mobileNo;

                if (mobileNo && !mobileNo.startsWith('+')) {
                    mobileNo = `+92${mobileNo.slice(1)}`;
                }

                // Send WhatsApp notification
                if (mobileNo) {
                    await client.messages.create({
                        body: `Hello ${assignedUser.name}! The task "${updatedTask.title}" has been updated. Kindly review the changes on the portal: https://zamtas-ems.vercel.app`,
                        from: twilioWhatsapp,
                        to: `whatsapp:${mobileNo}`
                    });
                }
            }
        }

        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask,
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
    getProjectDetailsController,
    startTaskController,
    completeTaskController,
    updateTaskController
};

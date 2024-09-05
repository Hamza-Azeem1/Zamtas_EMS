const Project = require('../models/projectModel');

exports.checkProjectIdController = async (req, res) => {
    try {
        const { projectId } = req.params;
        const existingProject = await Project.findOne({ projectId });
        if (existingProject) {
            return res.status(400).json({ message: 'Project ID already exists', exists: true });
        }
        res.status(200).json({ message: 'Project ID is available', exists: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to check project ID.', error: error.message });
    }
};

exports.addProjectController = async (req, res) => {
    try {
        const { projectName, projectId, clientId, clientContact, startDate, endDate, projectManagerId, location, budget } = req.body;

        // Check if project with the same ID already exists
        const existingProject = await Project.findOne({ projectId });
        if (existingProject) {
            return res.status(400).json({ message: 'Project with this ID already exists.' });
        }

        const newProject = new Project({
            projectName,
            projectId,
            clientId,
            clientContact,
            startDate,
            endDate,
            projectManager: projectManagerId,
            location,
            budget
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created successfully!', data: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create project.', error: error.message });
    }
};

exports.getProjectsController = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('clientId', 'clientName')
            .populate('projectManager', 'name');

        res.status(200).json({ message: 'Projects retrieved successfully!', data: projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve projects.', error: error.message });
    }
};

exports.updateProjectController = async (req, res) => {
    const { projectId } = req.params;
    const projectData = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, projectData, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};


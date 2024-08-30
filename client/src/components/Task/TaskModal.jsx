import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Api from '../../common/index';
import PropTypes from 'prop-types';
import ROLE from '../../common/role';

const TaskModal = ({ isOpen, onClose }) => {
    const [task, setTask] = useState({
        title: '',
        category: 'Installation',
        project: '',
        projectManager: '',
        startDate: '',
        endDate: '',
        assignedTo: '',
        status: 'Started'
    });

    const [projects, setProjects] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios.get(Api.getProject.url)
                .then(res => setProjects(res.data.data || []))
                .catch(err => console.error(err));

            axios.get(Api.getProjectManager.url)
                .then(res => setProjectManagers(res.data.data || []))
                .catch(err => console.error(err));

            axios.get(Api.getEmployee.url)
                .then(res => {
                    const filteredEmployees = res.data.data.filter(emp => emp.role === ROLE.GENERAL); // Filter employees by role
                    setEmployees(filteredEmployees);
                })
                .catch(err => console.error(err));
        } else {
            resetForm(); // Reset form when modal closes
        }
    }, [isOpen]);

    const resetForm = () => {
        setTask({
            title: '',
            category: 'Installation',
            project: '',
            projectManager: '',
            startDate: '',
            endDate: '',
            assignedTo: '',
            status: 'Started'
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    };

    const handleProjectChange = (e) => {
        const projectId = e.target.value;
        axios.get(`${Api.getProjectDetail.url.replace(':projectId', projectId)}`)
            .then(res => {
                const { projectManager, startDate, endDate } = res.data.data;
                setTask(prev => ({
                    ...prev,
                    project: projectId,
                    projectManager: projectManager._id,
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate)
                }));
            })
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(Api.addTask.url, task)
            .then(() => {
                onClose();
            })
            .catch(err => console.error(err));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-auto overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold mb-4">Add Task</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="category">Task Category</label>
                        <select
                            id="category"
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="Installation">Installation</option>
                            <option value="Service">Service</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="project">Project</label>
                        <select
                            id="project"
                            name="project"
                            value={task.project || ''}
                            onChange={handleProjectChange}
                            className="w-full border rounded-lg p-2"
                            required
                        >
                            <option value="">Select Project</option>
                            {projects.length === 0 ? (
                                <option>Loading...</option>
                            ) : (
                                projects.map(project => (
                                    <option key={project._id} value={project._id}>{project.projectName}</option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="projectManager">Project Manager</label>
                        <select
                            id="projectManager"
                            name="projectManager"
                            value={task.projectManager || ''}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            disabled={!task.project}
                        >
                            <option value="">Select Project Manager</option>
                            {projectManagers.map(manager => (
                                <option key={manager._id} value={manager._id}>{manager.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={task.startDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="endDate">Due Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={task.endDate}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="assignedTo">Assigned To</label>
                        <select
                            id="assignedTo"
                            name="assignedTo"
                            value={task.assignedTo || ''}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                            required
                        >
                            <option value="">Select Team Member</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block mb-1" htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={task.status || ''}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="Started" className='text-yellow-400 font-medium'>Started</option>
                            <option value="Delayed" className='text-red-800 font-medium'>Delayed</option>
                            <option value="Done" className='text-green-800 font-medium'>Done</option>
                        </select>
                    </div>
                    <div className="flex justify-end w-full mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

TaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default TaskModal;

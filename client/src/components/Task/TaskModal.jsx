import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';
import Api from '../../common/index';
import ROLE from '../../common/role';
import Select from 'react-select';

const TaskModal = ({ isOpen, onClose, taskDetails, onAdd }) => {
    const [task, setTask] = useState({
        title: '',
        category: 'Installation',
        project: '',
        projectManager: '',
        startDate: '',
        endDate: '',
        assignedTo: [],
        teamLead: '',
        status: 'Assigned'
    });
    const [projects, setProjects] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !taskDetails) {
            setLoading(true);
            Promise.all([
                axios.get(Api.getProject.url),
                axios.get(Api.getProjectManager.url),
                axios.get(Api.getEmployee.url)
            ]).then(([projectsRes, managersRes, employeesRes]) => {
                setProjects(projectsRes.data.data || []);
                setProjectManagers(managersRes.data.data || []);
                const filteredEmployees = employeesRes.data.data.filter(emp => emp.role === ROLE.GENERAL);
                setEmployees(filteredEmployees);
            }).catch(err => console.error(err))
                .finally(() => setLoading(false));
        } else if (taskDetails) {
            setTask(taskDetails);
        }
    }, [isOpen, taskDetails]);

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(Api.addTask.url, task)
            .then(res => {
                onAdd(res.data);
                onClose();
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Assigned':
                return 'text-yellow-400 font-medium';
            case 'In Progress':
                return 'text-brown-400 font-medium';
            case 'Delayed':
                return 'text-red-800 font-medium';
            case 'Done':
                return 'text-green-800 font-medium';
            default:
                return '';
        }
    };

    if (!isOpen) return null;

    // Transform employees data for react-select
    const employeeOptions = employees.map(emp => ({
        value: emp._id,
        label: emp.name
    }));

    // Handle react-select change
    const handleAssignedToChange = (selectedOptions) => {
        setTask(prev => ({
            ...prev,
            assignedTo: selectedOptions.map(option => option.value)
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] max-w-screen-lg max-h-[90vh] overflow-auto landscape-orientation">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{taskDetails ? 'View Task' : 'Add Task'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                {loading && <div className="spinner mx-auto mb-4"></div>}
                {taskDetails ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-2xl max-w-screen-lg mx-auto">
                        {/* Task Information */}
                        <div className="space-y-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-300 pb-3 mb-6">Task Information</h3>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Title:</span>
                                <span className="text-gray-900 font-medium">{task.title}</span>
                            </div>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Category:</span>
                                <span className="text-gray-900 font-medium">{task.category}</span>
                            </div>

                            <div className="flex items-center text-lg">
                                <span className="text-gray-700 font-bold flex-shrink-0 w-32">Project:</span>
                                <div className="flex-grow ml-4 overflow-hidden">
                                    <span className="text-gray-900 font-medium">{task.project.projectName}</span>
                                </div>
                            </div>


                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Project Manager:</span>
                                <span className="text-gray-900 font-medium">{task.projectManager.name}</span>
                            </div>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Start Date:</span>
                                <span className="text-gray-900 font-medium">{new Date(task.startDate).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Due Date:</span>
                                <span className="text-gray-900 font-medium">{new Date(task.endDate).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center justify-between text-lg">
                                <span className="text-gray-700 font-bold">Team Lead:</span>
                                <span className="text-gray-900 font-medium">{task.teamLead.name}</span>
                            </div>

                            <div className={`font-bold ${getStatusColor(task.status)} flex items-center justify-between text-lg`}>
                                <span className="text-gray-700">Status:</span>
                                <span className="uppercase tracking-wider">{task.status}</span>
                            </div>
                        </div>

                        {/* Assigned Members */}
                        <div className="space-y-6 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-300 pb-3 mb-6">Assigned Team Members</h3>
                            <ul className="space-y-3 bg-white p-4 rounded-lg shadow-md">
                                {task.assignedTo.map(user => (
                                    <li key={user._id} className="text-gray-700 font-medium flex items-center space-x-3 hover:bg-green-100 p-2 rounded-md transition duration-300 ease-in-out">
                                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span>{user.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 space-y-4">
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="category">Task Category</label>
                            <select
                                id="category"
                                name="category"
                                value={task.category}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Installation">Installation</option>
                                <option value="Service">Service</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="project">Project</label>
                            <select
                                id="project"
                                name="project"
                                value={task.project}
                                onChange={handleProjectChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Project</option>
                                {projects.map(project => (
                                    <option key={project._id} value={project._id}>{project.projectName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="projectManager">Project Manager</label>
                            <select
                                id="projectManager"
                                name="projectManager"
                                value={task.projectManager}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!task.project}
                            >
                                <option value="">Select Project Manager</option>
                                {projectManagers.map(manager => (
                                    <option key={manager._id} value={manager._id}>{manager.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={task.startDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="endDate">Due Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={task.endDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="assignedTo">Assigned To</label>
                            <Select
                                id="assignedTo"
                                name="assignedTo"
                                isMulti
                                options={employeeOptions}
                                value={employeeOptions.filter(option => task.assignedTo.includes(option.value))}
                                onChange={handleAssignedToChange}
                                className="basic-single"
                                classNamePrefix="select"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold" htmlFor="teamLead">Team Lead</label>
                            <select
                                id="teamLead"
                                name="teamLead"
                                value={task.teamLead}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Team Lead</option>
                                {task.assignedTo.map(userId => {
                                    const employee = employees.find(emp => emp._id === userId);
                                    return employee ? (
                                        <option key={employee._id} value={employee._id}>{employee.name}</option>
                                    ) : null;
                                })}
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end mt-4">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>

    );
};

TaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    taskDetails: PropTypes.object,
    onAdd: PropTypes.func.isRequired
};

export default TaskModal;
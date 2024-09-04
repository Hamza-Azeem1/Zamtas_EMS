import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';
import Api from '../../common/index';
import ROLE from '../../common/role';

const TaskModal = ({ isOpen, onClose, taskDetails, onAdd }) => {
    const [task, setTask] = useState({
        title: '',
        category: 'Installation',
        project: '',
        projectManager: '',
        startDate: '',
        endDate: '',
        assignedTo: '',
        status: 'Assigned'
    });
    const [projects, setProjects] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        if (isOpen && !taskDetails) {
            setLoading(true);
            axios.get(Api.getProject.url)
                .then(res => setProjects(res.data.data || []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false)); // Hide spinner

            setLoading(true);
            axios.get(Api.getProjectManager.url)
                .then(res => setProjectManagers(res.data.data || []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false)); // Hide spinner

            setLoading(true);
            axios.get(Api.getEmployee.url)
                .then(res => {
                    const filteredEmployees = res.data.data.filter(emp => emp.role === ROLE.GENERAL); // Filter employees by role
                    setEmployees(filteredEmployees);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false)); // Hide spinner
        } else if (taskDetails) {
            setTask(taskDetails);
        }
    }, [isOpen, taskDetails]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Assigned':
                return 'text-yellow-400 font-medium';
            default:
                return '';
        }
    };

    const resetForm = () => {
        setTask({
            title: '',
            category: 'Installation',
            project: '',
            projectManager: '',
            startDate: '',
            endDate: '',
            assignedTo: '',
            status: 'Assigned'
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
        setLoading(true); // Show spinner
        axios.post(Api.addTask.url, task)
            .then(res => {
                onAdd(res.data);
                onClose();
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false)); // Hide spinner
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg w-full h-auto overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{taskDetails ? 'View Task' : 'Add Task'}</h2>
                    <button onClick={() => {
                        onClose();
                        if (!taskDetails) resetForm();
                    }} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                {loading && <div className="spinner mx-auto mb-4"></div>} {/* Show spinner if loading */}
                {taskDetails ? (
                    <div className="flex flex-col md:flex-row gap-6 max-h-[calc(100vh-150px)] overflow-y-auto">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-4">Task Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">Title:</p>
                                    <p>{task.title}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Category:</p>
                                    <p>{task.category}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Project:</p>
                                    <p>{task.project.projectName}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Project Manager:</p>
                                    <p>{task.projectManager.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Start Date:</p>
                                    <p>{new Date(task.startDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Due Date:</p>
                                    <p>{new Date(task.endDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Assigned To:</p>
                                    <p>{task.assignedTo.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Status:</p>
                                    <p className={`text-${getStatusColor(task.status)}`}>{task.status}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-4">Images</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">Start Image:</p>
                                    {task.startImage ? (
                                        <img
                                            src={task.startImage}
                                            alt="Start"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 mt-2"
                                        />
                                    ) : (
                                        <p>No start image available</p>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">Complete Image:</p>
                                    {task.completeImage ? (
                                        <img
                                            src={task.completeImage}
                                            alt="Complete"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300 mt-2"
                                        />
                                    ) : (
                                        <p>No complete image available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <option value="Assigned" className='text-yellow-400 font-medium'>Assigned</option>
                            </select>
                        </div>
                        <div className="flex justify-end w-full mt-4">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Task'}
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
    onAdd: PropTypes.func
};

export default TaskModal;

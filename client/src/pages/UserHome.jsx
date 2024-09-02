import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaTasks, FaInfoCircle, FaTimes, FaUpload, FaCheck } from 'react-icons/fa';
import Api from '../common/index';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function UserHome() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startImage, setStartImage] = useState(null);
    const [completeImage, setCompleteImage] = useState(null);
    const [startImagePreview, setStartImagePreview] = useState(null);
    const [completeImagePreview, setCompleteImagePreview] = useState(null);
    const [showCompleteSection, setShowCompleteSection] = useState(false);
    const [taskStatus, setTaskStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Started':
                return 'text-yellow-400 font-medium';
            case 'In Progress':
                return 'text-pink-800 font-medium';
            case 'Delayed':
                return 'text-red-800 font-medium';
            case 'Done':
                return 'text-green-800 font-medium';
            default:
                return '';
        }
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not authorized, please log in again.');
            }

            const response = await axios.get(Api.getUserTasks.url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.data.length === 0) {
                setTasks([]);
            } else {
                setTasks(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            setError(error.message || 'An error occurred.');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setStartImage(null);
        setCompleteImage(null);
        setStartImagePreview(null);
        setCompleteImagePreview(null);
        setTaskStatus(task.status);

        if (task.status === 'In Progress') {
            setShowCompleteSection(true);
        } else if (task.status === 'Done') {
            setShowCompleteSection(false);
        } else {
            setShowCompleteSection(false);
        }
    };

    const closeModal = () => {
        setSelectedTask(null);
        setStartImage(null);
        setCompleteImage(null);
        setStartImagePreview(null);
        setCompleteImagePreview(null);
        setTaskStatus('');
        setShowCompleteSection(false);
    };

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'start') {
                    setStartImage(file);
                    setStartImagePreview(reader.result);
                } else {
                    setCompleteImage(file);
                    setCompleteImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStartTask = async () => {
        if (!startImage) {
            setError('Please upload an image to start the task.');
            return;
        }

        const formData = new FormData();
        formData.append('taskId', selectedTask._id);
        formData.append('startImage', startImage);

        try {
            const token = localStorage.getItem('token');
            await axios.post(Api.startTask.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
            setShowCompleteSection(true);
            setTaskStatus('In Progress');
        } catch (error) {
            setError(error.response?.data?.message || 'Error starting task');
        }
    };

    const handleCompleteTask = async () => {
        if (!completeImage) {
            setError('Please upload an image to complete the task.');
            return;
        }

        const formData = new FormData();
        formData.append('taskId', selectedTask._id);
        formData.append('completeImage', completeImage);

        try {
            const token = localStorage.getItem('token');
            await axios.post(Api.submitTask.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
            setTaskStatus('Done');
        } catch (error) {
            setError(error.response?.data?.message || 'Error completing task');
        }
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex justify-between px-6 py-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaTasks className="mr-2" /> Your Tasks
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition duration-300"
                >
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </header>
            <main className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Total Tasks: {tasks.length}
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white rounded-lg shadow-md overflow-hidden flex items-center p-4">
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                                <p className="text-gray-600">Assigned By: {task.projectManager.name}</p>
                                <p className={`text-gray-600 ${getStatusColor(task.status)}`}>
                                    Status: {task.status}
                                </p>

                            </div>
                            <button
                                onClick={() => openModal(task)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                            >
                                <FaInfoCircle className="mr-2" /> View Details
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {selectedTask && (
                <Modal
                    isOpen={!!selectedTask}
                    onRequestClose={closeModal}
                    contentLabel="Task Details"
                    className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div className="relative w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition duration-300"
                        >
                            <FaTimes size={24} />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">{selectedTask.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-lg font-base mb-2"><strong>Category:</strong> {selectedTask.category}</p>
                                <p className="text-lg font-base mb-2"><strong>Location:</strong> {selectedTask.project.location}</p>
                            </div>
                            <div>
                                <p className="text-lg font-base mb-2"><strong>Assigned By:</strong> {selectedTask.projectManager.name}</p>
                                <p className="text-lg font-base mb-2"><strong>End Date:</strong> {new Date(selectedTask.endDate).toLocaleDateString()}</p>
                                <p className={`text-lg font-base mb-2 ${getStatusColor(selectedTask.status)}`}>
                                    <strong>Status:</strong> {selectedTask.status}
                                </p>

                            </div>
                        </div>
                        {!showCompleteSection && taskStatus !== 'Done' && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Start Task</h3>
                                <div className="flex items-center space-x-4">
                                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                        <FaUpload className="w-8 h-8" />
                                        <span className="mt-2 text-base leading-normal">Select Start Image</span>
                                        <input type='file' className="hidden" onChange={(e) => handleImageUpload(e, 'start')} />
                                    </label>
                                    {startImagePreview && (
                                        <div className="w-24 h-24 relative">
                                            <img src={startImagePreview} alt="Start Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleStartTask}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
                                >
                                    <FaCheck className="mr-2" /> Start Task
                                </button>
                            </div>
                        )}

                        {showCompleteSection && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Complete Task</h3>
                                <div className="flex items-center space-x-4">
                                    <label className="flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                        <FaUpload className="w-8 h-8" />
                                        <span className="mt-2 text-base leading-normal">Select Complete Image</span>
                                        <input type='file' className="hidden" onChange={(e) => handleImageUpload(e, 'complete')} />
                                    </label>
                                    {completeImagePreview && (
                                        <div className="w-24 h-24 relative">
                                            <img src={completeImagePreview} alt="Complete Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleCompleteTask}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                                >
                                    <FaCheck className="mr-2" /> Complete Task
                                </button>
                            </div>
                        )}

                        {taskStatus === 'Done' && (
                            <div className="mt-4 text-center text-green-500">
                                <h3 className="text-lg font-semibold">Task Completed</h3>
                                <p>Your task is marked as completed.</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UserHome;

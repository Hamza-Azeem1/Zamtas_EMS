import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api from '../common/index'; // Adjust the import based on your file structure

function UserHome() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in.');
                }

                const response = await axios.get(Api.getUserTasks.url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.data.length === 0) {
                    console.log('No tasks available');
                    setTasks([]); // Set an empty array if no tasks are available
                } else {
                    setTasks(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred.');
                setLoading(false);
            }
        };

        fetchTasks();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks: {error}</p>;

    return (
        <div className="h-screen bg-gray-100">
            <header className="flex justify-between px-4 py-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Welcome, User!</h1>
                <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    Logout
                </button>
            </header>
            <main className="p-4">
                <h2 className="text-lg font-semibold mb-4">Your Assigned Tasks</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Task</th>
                            <th className="py-3 px-6 text-left">Category</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-left">Assigned By</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {tasks.map(task => (
                            <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{task.title}</td>
                                <td className="py-3 px-6 text-left">{task.category}</td>
                                <td className="py-3 px-6 text-left">{task.location}</td>
                                <td className="py-3 px-6 text-left">{task.projectManager.name}</td>
                                <td className="py-3 px-6 text-left">{new Date(task.endDate).toLocaleDateString()}</td>
                                <td className="py-3 px-6 text-left">{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default UserHome;
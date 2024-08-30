import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const TaskTable = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(Api.getTask.url)
            .then(res => {
                setTasks(res.data.data || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error}</p>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Started':
                return 'text-yellow-400 font-medium';
            case 'Delayed':
                return 'text-red-800 font-medium';
            case 'Done':
                return 'text-green-800 font-medium';
            default:
                return '';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-5">
                <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
                    <tr>
                        <th className="py-2 px-3 border-b border-gray-300">Title</th>
                        <th className="py-2 px-3 border-b border-gray-300">Category</th>
                        <th className="py-2 px-3 border-b border-gray-300">Project</th>
                        <th className="py-2 px-3 border-b border-gray-300">Project Manager</th>
                        <th className="py-2 px-3 border-b border-gray-300">Start Date</th>
                        <th className="py-2 px-3 border-b border-gray-300">Due Date</th>
                        <th className="py-2 px-3 border-b border-gray-300">Assigned To</th>
                        <th className="py-2 px-3 border-b border-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{task.title}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{task.category}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{task.project.projectName}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{task.projectManager.name}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{new Date(task.startDate).toLocaleDateString()}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{new Date(task.endDate).toLocaleDateString()}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{task.assignedTo.name}</td>
                            <td className={`py-3 px-6 border-b border-gray-300 text-center text-base ${getStatusColor(task.status)}`}>
                                {task.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;

import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';
import TaskTable from './TaskTable';
import Pagination from '../Pagination';
import Api from '../../common/index';
import Spinner from '../Spinner';
import { TbListDetails } from "react-icons/tb";

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskDetails, setTaskDetails] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);

    // Function to fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(Api.getTask.url);
            if (data && data.data) {
                setTasks(data.data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch tasks when component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to handle adding a new task
    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setIsModalOpen(false);
    };

    // Function to handle viewing a task
    const handleViewTask = (task) => {
        setTaskDetails(task);
        setIsModalOpen(true);
    };

    // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    // Function to handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
            >
                <TbListDetails className="mr-2 text-xl" />
                Add Task
            </button>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {tasks.length > 0 ? (
                        <>
                            <TaskTable tasks={currentTasks} onView={handleViewTask} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(tasks.length / tasksPerPage)}
                                onPageChange={paginate}
                            />
                        </>
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </>
            )}

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setTaskDetails(null);
                }}
                taskDetails={taskDetails}
                onAdd={handleAddTask}
            />
        </div>
    );
};

export default Tasks;

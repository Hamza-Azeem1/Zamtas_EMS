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

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(Api.getTask.url);
            setTasks(data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setIsModalOpen(false);
    };

    const handleViewTask = (task) => {
        setTaskDetails(task);
        setIsModalOpen(true);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

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
                    <TaskTable tasks={currentTasks} onView={handleViewTask} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(tasks.length / tasksPerPage)}
                        onPageChange={paginate}
                    />
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

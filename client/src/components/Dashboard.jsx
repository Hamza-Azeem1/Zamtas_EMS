import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskTable from '../components/Task/TaskTable';
import TaskModal from '../components/Task/TaskModal';
import Spinner from '../components/Spinner';
import Api from '../common/index';
import { FaUsers, FaProjectDiagram, FaUserTie, FaUserFriends } from 'react-icons/fa';
import NotificationBar from '../components/NotificationBar';
import Pagination from '../components/Pagination';

const Dashboard = () => {
    const [clientCount, setClientCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [projectManagerCount, setProjectManagerCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [taskCounts, setTaskCounts] = useState({
        Assigned: 0,
        Delayed: 0,
        Done: 0,
        'In Progress': 0,
        All: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewOnly, setIsViewOnly] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsRes, projectsRes, projectManagersRes, employeesRes, tasksRes] = await Promise.all([
                    axios.get(Api.getClient.url),
                    axios.get(Api.getProject.url),
                    axios.get(Api.getProjectManager.url),
                    axios.get(Api.getEmployee.url),
                    axios.get(Api.getTask.url),
                ]);

                setClientCount(clientsRes.data.data.length);
                setProjectCount(projectsRes.data.data.length);
                setProjectManagerCount(projectManagersRes.data.data.length);
                setEmployeeCount(employeesRes.data.data.length);

                const allTasks = tasksRes.data.data || [];
                setTasks(allTasks);

                const taskCounts = {
                    Assigned: allTasks.filter(task => task.status === 'Assigned').length,
                    Delayed: allTasks.filter(task => task.status === 'Delayed').length,
                    Done: allTasks.filter(task => task.status === 'Done').length,
                    'In Progress': allTasks.filter(task => task.status === 'In Progress').length,
                    All: allTasks.length
                };

                setTaskCounts(taskCounts);
                setFilteredTasks(allTasks);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterTasks = () => {
            let filtered;
            switch (activeTab) {
                case 'Assigned':
                    filtered = tasks.filter(task => task.status === 'Assigned');
                    break;
                case 'Delayed':
                    filtered = tasks.filter(task => task.status === 'Delayed');
                    break;
                case 'Done':
                    filtered = tasks.filter(task => task.status === 'Done');
                    break;
                case 'In Progress':
                    filtered = tasks.filter(task => task.status === 'In Progress');
                    break;
                default:
                    filtered = tasks;
            }
            setFilteredTasks(filtered);
        };

        filterTasks();
    }, [activeTab, tasks]);

    // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Function to handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewTask = (task) => {
        setSelectedTask(task);
        setIsViewOnly(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
        setIsViewOnly(false);
        setIsModalOpen(false);
    };

    const handleAddTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        setIsModalOpen(false);
    };

    const cards = [
        { title: 'Total Clients', count: clientCount, icon: FaUsers },
        { title: 'Total Projects', count: projectCount, icon: FaProjectDiagram },
        { title: 'Total Project Managers', count: projectManagerCount, icon: FaUserTie },
        { title: 'Total Team Members', count: employeeCount, icon: FaUserFriends },
    ];

    return (
        <div className="p-6 bg-gray-100 overflow-x-hidden">
            <NotificationBar />
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
                    {/* Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex items-center space-x-4 transform hover:scale-105"
                            >
                                <card.icon className="text-4xl text-blue-500" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{card.title}</h3>
                                    <p className="text-3xl font-medium text-center text-gray-900">{card.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs Section */}
                    <h3 className='text-2xl font-semibold mb-4 mt-4'>Task Overview</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-center space-x-4 mb-6">
                            {['All', 'Assigned', 'In Progress', 'Done', 'Delayed'].map(status => (
                                <button
                                    key={status}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none ${activeTab === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                    onClick={() => {
                                        setActiveTab(status);
                                        setCurrentPage(1); // Reset to first page when tab changes
                                    }}
                                >
                                    {status} ({taskCounts[status]})
                                </button>
                            ))}
                        </div>

                        {filteredTasks.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <TaskTable
                                        tasks={currentTasks} // Use currentTasks for pagination
                                        onView={handleViewTask}
                                        showEdit={false} // Only show the eye icon
                                    />
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(filteredTasks.length / tasksPerPage)}
                                    onPageChange={paginate}
                                />
                            </>
                        ) : (
                            <p className="text-center font-bold text-gray-600">No tasks available for {activeTab} status</p>
                        )}
                    </div>

                    {/* Task Modal */}
                    {isModalOpen && (
                        <TaskModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            taskDetails={selectedTask}
                            onAdd={handleAddTask}
                            isViewOnly={isViewOnly} // Pass isViewOnly prop to TaskModal
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;

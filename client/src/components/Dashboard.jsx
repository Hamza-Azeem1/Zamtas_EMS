import { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../common/index';
import Spinner from '../components/Spinner';
import { FaUsers, FaProjectDiagram, FaUserTie, FaUserFriends } from 'react-icons/fa';

const Dashboard = () => {
    const [clientCount, setClientCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [projectManagerCount, setProjectManagerCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsRes, projectsRes, projectManagersRes, employeesRes] = await Promise.all([
                    axios.get(Api.getClient.url),
                    axios.get(Api.getProject.url),
                    axios.get(Api.getProjectManager.url),
                    axios.get(Api.getEmployee.url),
                ]);

                setClientCount(clientsRes.data.data.length);
                setProjectCount(projectsRes.data.data.length);
                setProjectManagerCount(projectManagersRes.data.data.length);
                setEmployeeCount(employeesRes.data.data.length);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const cards = [
        { title: 'Total Clients', count: clientCount, icon: FaUsers },
        { title: 'Total Projects', count: projectCount, icon: FaProjectDiagram },
        { title: 'Total Project Managers', count: projectManagerCount, icon: FaUserTie },
        { title: 'Total Team Members', count: employeeCount, icon: FaUserFriends },
    ];

    return (
        <div className="p-4">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="p-6 border rounded-lg shadow-lg flex items-center space-x-4 transform transition-transform hover:scale-105"
                        >
                            <card.icon className="text-4xl text-gray-600" />
                            <div>
                                <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                                <p className="text-3xl font-semibold text-gray-800">{card.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;

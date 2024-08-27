import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Employees from '../components/Employees';
import Tasks from '../components/Tasks';

const Home = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <Dashboard />;
            case 'employees':
                return <Employees />;
            case 'tasks':
                return <Tasks />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <button
                                className={`w-full text-left py-2 px-4 rounded ${activeMenu === 'dashboard' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveMenu('dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className={`w-full text-left py-2 px-4 rounded ${activeMenu === 'employees' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveMenu('employees')}
                            >
                                Employees
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className={`w-full text-left py-2 px-4 rounded ${activeMenu === 'tasks' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveMenu('tasks')}
                            >
                                Tasks
                            </button>
                        </li>
                    </ul>
                </nav>
                <button
                    className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 p-10">
                <h1 className="text-3xl font-semibold mb-6">
                    {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
                </h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default Home;
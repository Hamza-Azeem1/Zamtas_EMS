import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-700">
                    Welcome, {'Team Member'}!
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserHome;

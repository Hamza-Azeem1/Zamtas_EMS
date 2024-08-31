import { useNavigate } from 'react-router-dom';

function UserHome() {
    const navigate = useNavigate();



    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="h-screen bg-gray-100">
            <header className="flex justify-between px-4 py-4 bg-white shadow-md">
                <h1 className="text-xl font-bold text-gray-800">Welcome {'User'}! </h1>
                <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                    Logout
                </button>
            </header>
            <main>
                <div>
                    <p>
                        Task Allocation
                    </p>
                </div>
            </main>
        </div>
    );
}

export default UserHome;
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleNotificationBar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div
                className={`fixed top-4 right-4 cursor-pointer text-2xl z-50 ${isVisible ? 'text-blue-500' : 'text-gray-700'}`}
                onClick={toggleNotificationBar}
            >
                <FaBell />
            </div>
            <div
                className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-40 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            >
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">Notifications</h3>
                </div>
                <div className="p-4">
                    <p>No new notifications</p>
                </div>
            </div>
        </>
    );
};

export default NotificationBar;

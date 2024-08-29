import { useState } from 'react';
import ClientModal from './ClientModal';
import ClientTable from './ClientTable';

const Client = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddClient = () => {
        setModalOpen(false);
        // Refresh the table or re-fetch data if necessary
        // In this case, you would need to re-fetch the clients list in the main component or use some global state management
    };

    return (
        <div className="p-6 space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Add Client
            </button>
            <ClientTable />
            {/* Client Modal Component */}
            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddClient}
            />
        </div>
    );
};

export default Client;



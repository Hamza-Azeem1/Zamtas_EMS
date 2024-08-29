import { useState, useEffect } from 'react';
import axios from 'axios';
import ClientModal from './ClientModal';
import ClientTable from './ClientTable';
import Api from '../../common/index';
import Spinner from '../spinner';

const Client = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClients = async () => {
        try {
            const { data } = await axios.get(Api.getClient.url);
            setClients(data.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddClient = (newClient) => {
        setClients(prevClients => [...prevClients, newClient]);
        setModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Add Client
            </button>
            {isLoading ? (
                <Spinner />
            ) : (
                <ClientTable clients={clients} />
            )}
            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddClient}
            />
        </div>
    );
};

export default Client;

import { useState, useEffect } from 'react';
import axios from 'axios';
import ClientModal from './ClientModal';
import ClientTable from './ClientTable';
import Pagination from '../Pagination';
import Api from '../../common/index';
import Spinner from '../Spinner';
import { TbUserShield } from "react-icons/tb";

const Client = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(10);

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

    // Get current clients
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
            >
                <TbUserShield className="mr-2 text-xl" />
                Add Customer
            </button>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <ClientTable clients={currentClients} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(clients.length / clientsPerPage)}
                        onPageChange={paginate}
                    />
                </>
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
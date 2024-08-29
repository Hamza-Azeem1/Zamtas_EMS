import { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const ClientTable = () => {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const { data } = await axios.get(Api.getClient.url);
            setClients(data.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-600">Client Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Contact</th>
                        <th className="py-3 px-4 text-left text-gray-600">Address</th>
                        <th className="py-3 px-4 text-left text-gray-600">Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client._id} className="border-b">
                            <td className="py-3 px-4 text-gray-700">{client.clientName}</td>
                            <td className="py-3 px-4 text-gray-700">{client.clientContact}</td>
                            <td className="py-3 px-4 text-gray-700">{client.clientAddress}</td>
                            <td className="py-3 px-4 text-gray-700">{client.clientBudget}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;

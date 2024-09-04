import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ClientModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientContact: '',
        clientAddress: '',
        clientBudget: '',
        clientEmail: '',
        clientContactPerson: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                clientName: '',
                clientEmail: '',
                clientContactPerson: '',
                clientContact: '',
                clientAddress: '',
                clientBudget: ''
            });
            setError('');
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { clientName, clientContact, clientAddress, clientBudget, clientEmail, clientContactPerson } = formData;

        if (!/^[A-Za-z\s]+$/.test(clientName)) return "Client Name should only contain alphabets and spaces.";
        if (!/^[0-9]+$/.test(clientContact)) return "Client Contact should only contain numbers.";
        if (!/^[A-Za-z\s]+$/.test(clientAddress)) return "Client Address should only contain alphabets and spaces.";
        if (isNaN(clientBudget) || clientBudget < 0) return "Budget must be a positive number.";
        if (!/^\S+@\S+\.\S+$/.test(clientEmail)) return "Invalid email format.";
        if (!/^[A-Za-z\s]+$/.test(clientContactPerson)) return "Client Contact Person should only contain alphabets and spaces.";


        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const formattedData = {
            ...formData,
            clientBudget: Number(formData.clientBudget)
        };

        try {
            const response = await axios.post(Api.addClient.url, formattedData);
            onAdd(response.data.data);
            onClose();
        } catch (error) {
            console.error('Error adding client:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Error adding client. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 my-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add Customer</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(formData).map(key => (
                        <div key={key} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                            </label>
                            <input
                                type={key === 'clientBudget' ? 'number' : 'text'}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            />
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600">
                        Add Customer
                    </button>
                </form>
            </div>
        </div>
    );
};

ClientModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default ClientModal;

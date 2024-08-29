import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProjectModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        projectId: '',
        clientName: '',
        clientContact: '',
        startDate: '',
        endDate: '',
        projectManager: '',
        location: '',
        budget: ''
    });
    const [error, setError] = useState('');
    const [clients, setClients] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchClientsAndManagers = async () => {
                try {
                    const [clientsResponse, managersResponse] = await Promise.all([
                        axios.get(Api.getClient.url),
                        axios.get(Api.getProjectManager.url)
                    ]);
                    setClients(clientsResponse.data.data);
                    setProjectManagers(managersResponse.data.data);
                } catch (error) {
                    console.error('Error fetching clients or project managers:', error);
                    setError('Failed to load clients or project managers. Please try again.');
                }
            };

            fetchClientsAndManagers();
        } else {
            resetForm();
        }
    }, [isOpen]);

    const resetForm = () => {
        setFormData({
            projectName: '',
            projectId: '',
            clientName: '',
            clientContact: '',
            startDate: '',
            endDate: '',
            projectManager: '',
            location: '',
            budget: ''
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;
        const selectedClient = clients.find(client => client._id === selectedClientId);

        if (selectedClient) {
            setFormData(prev => ({
                ...prev,
                clientName: selectedClient._id,
                clientContact: selectedClient.clientContact,
                budget: selectedClient.clientBudget
            }));
        }
    };

    const handleProjectManagerChange = (e) => {
        setFormData(prev => ({
            ...prev,
            projectManager: e.target.value
        }));
    };

    const validateForm = () => {
        const { projectName, projectId, clientName, clientContact, startDate, endDate, budget } = formData;

        if (!/^[A-Za-z\s]+$/.test(projectName)) return "Project Name should only contain alphabets and spaces.";
        if (!/^[A-Za-z0-9]+$/.test(projectId)) return "Project ID should be alphanumeric.";
        if (!clientName) return "Please select a client.";
        if (!/^[0-9]+$/.test(clientContact)) return "Client Contact should only contain numbers.";
        if (isNaN(Date.parse(startDate))) return "Invalid Start Date.";
        if (isNaN(Date.parse(endDate))) return "Invalid End Date.";
        if (new Date(startDate) >= new Date(endDate)) return "Start Date must be before End Date.";
        if (isNaN(budget) || budget < 0) return "Budget must be a positive number.";
        if (!formData.projectManager) return "Please select a Project Manager.";

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
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
            budget: Number(formData.budget)
        };

        try {
            const response = await axios.post(Api.addProject.url, formattedData);
            console.log('Success:', response.data);
            onAdd();
            onClose();
        } catch (error) {
            console.error('Error adding project:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Error adding project. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mx-4 my-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add Project</h2>
                    <button onClick={() => { onClose(); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Project Name:
                        </label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Project ID:
                        </label>
                        <input
                            type="text"
                            name="projectId"
                            value={formData.projectId}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Client Name:
                        </label>
                        <select
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleClientChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        >
                            <option value="">Select Client</option>
                            {clients.map(client => (
                                <option key={client._id} value={client._id}>
                                    {client.clientName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Client Contact:
                        </label>
                        <input
                            type="text"
                            name="clientContact"
                            value={formData.clientContact}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            End Date:
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Project Manager:
                        </label>
                        <select
                            name="projectManager"
                            value={formData.projectManager}
                            onChange={handleProjectManagerChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        >
                            <option value="">Select Project Manager</option>
                            {projectManagers.map(manager => (
                                <option key={manager._id} value={manager._id}>
                                    {manager.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Location:
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Budget:
                        </label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            readOnly
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded col-span-2 hover:bg-blue-600">
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

ProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default ProjectModal;
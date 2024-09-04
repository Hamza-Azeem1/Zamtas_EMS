import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const EditProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        projectId: '',
        clientId: '',
        clientContact: '',
        startDate: '',
        endDate: '',
        projectManagerId: '',
        location: '',
        budget: ''
    });

    const [clients, setClients] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);

    useEffect(() => {
        // Fetch clients and project managers
        const fetchClientsAndManagers = async () => {
            try {
                const [clientsRes, managersRes] = await Promise.all([
                    axios.get(Api.getClient.url),
                    axios.get(Api.getProjectManager.url)
                ]);

                setClients(clientsRes.data.data);
                setProjectManagers(managersRes.data.data);

                // Set form data based on the project
                if (project) {
                    setFormData({
                        projectName: project.projectName || '',
                        projectId: project.projectId || '',
                        clientId: project.clientId?._id || '',
                        clientContact: project.clientContact || '',
                        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
                        projectManagerId: project.projectManager?._id || '',
                        location: project.location || '',
                        budget: project.budget || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchClientsAndManagers();
    }, [project]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClientChange = (e) => {
        const selectedClientId = e.target.value;
        const selectedClient = clients.find(client => client._id === selectedClientId);

        setFormData({
            ...formData,
            clientId: selectedClientId,
            clientContact: selectedClient?.contact || ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                Api.updateProject.url.replace(':projectId', formData.projectId),
                formData
            );
            onSave(response.data.data);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold">Project Name:</label>
                <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Client Name:</label>
                <select
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleClientChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client._id} value={client._id}>
                            {client.clientName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Client Contact:</label>
                <input
                    type="text"
                    name="clientContact"
                    value={formData.clientContact}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    readOnly
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Project Manager:</label>
                <select
                    name="projectManagerId"
                    value={formData.projectManagerId}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                >
                    <option value="">Select Project Manager</option>
                    {projectManagers.map(manager => (
                        <option key={manager._id} value={manager._id}>
                            {manager.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Budget:</label>
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

EditProjectForm.propTypes = {
    project: PropTypes.shape({
        projectName: PropTypes.string,
        projectId: PropTypes.string,
        clientId: PropTypes.shape({
            _id: PropTypes.string,
            clientName: PropTypes.string,
        }),
        clientContact: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        projectManager: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
        }),
        location: PropTypes.string,
        budget: PropTypes.number,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditProjectForm;

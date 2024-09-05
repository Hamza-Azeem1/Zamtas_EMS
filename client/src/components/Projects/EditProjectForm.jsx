import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';
import { FaTimes } from 'react-icons/fa';

const EditProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        projectId: '',
        clientId: '',
        clientContact: '',
        startDate: '',
        endDate: '',
        projectManagerId: '',
        productId: '',
        quantity: '',
        category: '',
        subcategory: '',
        model: '',
        budget: ''
    });

    const [clients, setClients] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch clients, project managers, and products
        const fetchClientsManagersProducts = async () => {
            try {
                const [clientsRes, managersRes, productsRes] = await Promise.all([
                    axios.get(Api.getClient.url),
                    axios.get(Api.getProjectManager.url),
                    axios.get(Api.getProduct.url)
                ]);

                setClients(clientsRes.data.data);
                setProjectManagers(managersRes.data.data);
                setProducts(productsRes.data.data);

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
                        productId: project.product?._id || '',
                        quantity: project.product?.quantity || '',
                        category: project.product?.category || '',
                        subcategory: project.product?.subcategory || 'N/A',
                        model: project.product?.model || '',
                        budget: project.budget || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchClientsManagersProducts();
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
            clientContact: selectedClient ? selectedClient.clientContact : ''
        });
    };

    const handleProductChange = (e) => {
        const selectedProductId = e.target.value;
        const selectedProduct = products.find(product => product._id === selectedProductId);

        setFormData({
            ...formData,
            productId: selectedProductId,
            quantity: selectedProduct ? selectedProduct.quantity : '',
            category: selectedProduct ? selectedProduct.category : '',
            subcategory: selectedProduct ? selectedProduct.subcategory : '',
            model: selectedProduct ? selectedProduct.model : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure the URL is correctly formatted
            const url = `${Api.updateProject.url.replace(':projectId', project._id)}`;

            // Update the project data on the server
            await axios.put(url, formData);

            // Pass updated project data to onSave callback
            onSave({ ...project, ...formData });
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center p-6 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Edit Project</h2>
                        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Project Name:</label>
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
                            <label className="text-sm font-medium text-gray-700 mb-1">Project ID:</label>
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
                            <label className="text-sm font-medium text-gray-700 mb-1">Client Name:</label>
                            <select
                                name="clientId"
                                value={formData.clientId}
                                onChange={handleClientChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            >
                                <option value="">Select Client</option>
                                {clients.map(client => (
                                    <option key={client._id} value={client._id}>{client.clientName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Client Contact:</label>
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
                            <label className="text-sm font-medium text-gray-700 mb-1">Start Date:</label>
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
                            <label className="text-sm font-medium text-gray-700 mb-1">End Date:</label>
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
                            <label className="text-sm font-medium text-gray-700 mb-1">Project Manager:</label>
                            <select
                                name="projectManagerId"
                                value={formData.projectManagerId}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            >
                                <option value="">Select Project Manager</option>
                                {projectManagers.map(manager => (
                                    <option key={manager._id} value={manager._id}>{manager.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Product:</label>
                            <select
                                name="productId"
                                value={formData.productId}
                                onChange={handleProductChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            >
                                <option value="">Select Product</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Subcategory:</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subcategory}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Model:</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-sm font-medium text-gray-700 mb-1">Budget:</label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            />
                        </div>
                        <div className="flex justify-end col-span-2 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                            >
                                Save Project
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end p-6">
                </div>
            </div>
        </div>
    );
};

EditProjectForm.propTypes = {
    project: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default EditProjectForm;

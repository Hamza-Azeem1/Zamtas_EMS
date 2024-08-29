import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProjectManagerModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        department: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                contact: '',
                email: '',
                department: ''
            });
            setError('');
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { name, contact, email, department } = formData;

        if (!/^[A-Za-z\s]+$/.test(name)) return "Name should only contain alphabets and spaces.";
        if (!/^\d{10}$/.test(contact)) return "Contact should be a 10-digit number.";
        if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return "Invalid email format.";
        if (!/^[A-Za-z\s]+$/.test(department)) return "Department should only contain alphabets and spaces.";

        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post(Api.addProjectManager.url, formData);
            console.log('Success:', response.data);
            onAdd();
            onClose();
        } catch (error) {
            console.error('Error adding project manager:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Error adding project manager. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mx-4 my-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add Project Manager</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {Object.keys(formData).map(key => (
                        <div key={key} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                            </label>
                            <input
                                type={key === 'contact' ? 'tel' : 'text'}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md shadow-sm p-3 w-full"
                            />
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded col-span-2 hover:bg-blue-600">
                        Add Project Manager
                    </button>
                </form>
            </div>
        </div>
    );
};

ProjectManagerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default ProjectManagerModal;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../common';
import { FaEdit, FaTrash, FaUserPlus, FaTimes, FaEye } from 'react-icons/fa';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        password: '',
        designation: '',
        department: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(Api.getEmployee.url);
            if (response.data.success) {
                setEmployees(response.data.data);
            } else {
                setError("Failed to fetch employees.");
            }
        } catch (error) {
            setError("Error fetching employees: " + error.message);
        }
    };

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const alphaRegex = /^[A-Za-z\s]+$/;

        if (!alphaRegex.test(newEmployee.designation)) {
            setError("Designation should contain only letters");
            return;
        }

        if (!alphaRegex.test(newEmployee.department)) {
            setError("Department should contain only letters");
            return;
        }

        try {
            const response = await axios.post(Api.signUp.url, newEmployee);
            if (response.data.success) {
                setShowForm(false);
                setNewEmployee({
                    name: '',
                    email: '',
                    password: '',
                    designation: '',
                    department: ''
                });
                fetchEmployees();
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error adding employee: " + error.message);
        }
    };

    const closeModal = () => {
        setShowForm(false);
        setError('');
        setNewEmployee({
            name: '',
            email: '',
            password: '',
            designation: '',
            department: ''
        });
    };

    const handleDeleteClick = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${Api.getEmployee.url}/${employeeToDelete}`);
            if (response.data.success) {
                fetchEmployees();
                setShowConfirm(false);
                setEmployeeToDelete(null);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Error deleting employee: " + error.message);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setEmployeeToDelete(null);
    };

    return (
        <div className="relative">
            <p className="mb-4">Here you can manage your employees, add new ones, or update/delete existing records.</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
                onClick={() => setShowForm(true)}
            >
                <FaUserPlus className="mr-2" /> Add New Employee
            </button>
            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Employee</h3>
                            {error && (
                                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="mt-2 text-left">
                                <input
                                    type="text"
                                    name="name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="mb-2 p-2 border rounded w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={newEmployee.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="mb-2 p-2 border rounded w-full"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={newEmployee.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className="mb-2 p-2 border rounded w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="designation"
                                    value={newEmployee.designation}
                                    onChange={handleInputChange}
                                    placeholder="Designation"
                                    className="mb-2 p-2 border rounded w-full"
                                />
                                <input
                                    type="text"
                                    name="department"
                                    value={newEmployee.department}
                                    onChange={handleInputChange}
                                    placeholder="Department"
                                    className="mb-2 p-2 border rounded w-full"
                                />
                                <div className="items-center px-4 py-3">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>
            )}
            {showConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="confirm-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Deletion</h3>
                            <p>Are you sure you want to delete this employee?</p>
                            <div className="mt-4">
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 ml-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={cancelDelete}
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                </div>
            )}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">Name</th>
                        <th className="py-2 px-4 border-b text-center">Email</th>
                        <th className="py-2 px-4 border-b text-center">Designation</th>
                        <th className="py-2 px-4 border-b text-center">Department</th>
                        <th className="py-2 px-4 border-b text-center">Role</th>
                        <th className="py-2 px-4 border-b text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td className="py-2 px-4 border-b text-center">{employee.name}</td>
                            <td className="py-2 px-4 border-b text-center">{employee.email}</td>
                            <td className="py-2 px-4 border-b text-center">{employee.designation || 'N/A'}</td>
                            <td className="py-2 px-4 border-b text-center">{employee.department || 'N/A'}</td>
                            <td className="py-2 px-4 border-b text-center">{employee.role}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button className="text-blue-500 hover:text-blue-700 mr-2">
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 mr-2"
                                    onClick={() => handleDeleteClick(employee._id)}
                                >
                                    <FaTrash size={20} />
                                </button>
                                <button className="text-green-500 hover:text-green-700">
                                    <FaEye size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Employees;

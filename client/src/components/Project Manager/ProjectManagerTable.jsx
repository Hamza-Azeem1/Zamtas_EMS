import { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const ProjectManagerTable = () => {
    const [managers, setManagers] = useState([]);

    const fetchProjectManagers = async () => {
        try {
            const { data } = await axios.get(Api.getProjectManager.url);
            setManagers(data.data);
        } catch (error) {
            console.error('Error fetching project managers:', error);
        }
    };

    useEffect(() => {
        fetchProjectManagers();
    }, []);

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-600">Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Contact</th>
                        <th className="py-3 px-4 text-left text-gray-600">Email</th>
                        <th className="py-3 px-4 text-left text-gray-600">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map(manager => (
                        <tr key={manager._id} className="border-b">
                            <td className="py-3 px-4 text-gray-700">{manager.name}</td>
                            <td className="py-3 px-4 text-gray-700">{manager.contact}</td>
                            <td className="py-3 px-4 text-gray-700">{manager.email}</td>
                            <td className="py-3 px-4 text-gray-700">{manager.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectManagerTable;

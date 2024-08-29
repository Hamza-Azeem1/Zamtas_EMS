import { useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';
import PropTypes from 'prop-types';

const ProjectManagerTable = ({ managers, setManagers }) => {
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
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
                    <tr>
                        <th className="py-2 px-3 border-b border-gray-300">Name</th>
                        <th className="py-2 px-3 border-b border-gray-300">Contact</th>
                        <th className="py-2 px-3 border-b border-gray-300">Email</th>
                        <th className="py-2 px-3 border-b border-gray-300">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager, index) => (
                        <tr key={manager._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{manager.name}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{manager.contact}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{manager.email}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base">{manager.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

ProjectManagerTable.propTypes = {
    managers: PropTypes.array.isRequired,
    setManagers: PropTypes.func.isRequired
};

export default ProjectManagerTable;
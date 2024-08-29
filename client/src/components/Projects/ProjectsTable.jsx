import { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get(Api.getProject.url);
            setProjects(data.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-600">Project Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Client Name</th>
                        <th className="py-3 px-4 text-left text-gray-600">Start Date</th>
                        <th className="py-3 px-4 text-left text-gray-600">End Date</th>
                        <th className="py-3 px-4 text-left text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id} className="border-b">
                            <td className="py-3 px-4 text-gray-700">{project.projectName}</td>
                            <td className="py-3 px-4 text-gray-700">{project.clientName}</td>
                            <td className="py-3 px-4 text-gray-700">{new Date(project.startDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-gray-700">{new Date(project.endDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-gray-700">{project.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsTable;

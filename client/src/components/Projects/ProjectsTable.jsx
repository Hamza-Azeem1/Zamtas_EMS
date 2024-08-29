import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const ProjectsTable = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(Api.getProject.url);
                setProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gray-100 text-gray-900 uppercase text-sm font-semibold">
                    <tr>
                        <th className="py-2 px-3 border-b border-gray-300">Project Name</th>
                        <th className="py-2 px-3 border-b border-gray-300">Client Name</th>
                        <th className="py-2 px-3 border-b border-gray-300">Client Contact</th>
                        <th className="py-2 px-3 border-b border-gray-300">Start Date</th>
                        <th className="py-2 px-3 border-b border-gray-300">End Date</th>
                        <th className="py-2 px-3 border-b border-gray-300">Project Manager</th>
                        <th className="py-2 px-3 border-b border-gray-300">Location</th>
                        <th className="py-2 px-3 border-b border-gray-300">Budget</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 text-base">
                    {projects.map((project, index) => (
                        <tr key={project._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.projectName}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.clientId?.clientName}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.clientContact}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{new Date(project.startDate).toLocaleDateString()}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{new Date(project.endDate).toLocaleDateString()}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.projectManager?.name}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.location}</td>
                            <td className="py-4 px-6 border-b border-gray-300 text-center">{project.budget.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ProjectsTable;

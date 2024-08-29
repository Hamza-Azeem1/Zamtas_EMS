import { useState } from 'react';
import ProjectModal from './ProjectModal';
import ProjectsTable from './ProjectsTable';
import { FaPlusSquare } from 'react-icons/fa';

const Projects = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAddProject = () => {
        setModalOpen(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="p-6 space-y-4">

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 mt-5 flex items-center"
                onClick={() => setModalOpen(true)}
            >
                <FaPlusSquare className="mr-2" />
                Add New Project
            </button>
            <ProjectsTable key={refreshKey} />
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProject}
            />
        </div>
    );
};

export default Projects;

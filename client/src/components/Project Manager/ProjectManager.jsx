import { useState } from 'react';
import ProjectManagerModal from './ProjectManagerModal';
import ProjectManagerTable from './ProjectManagerTable';

const ProjectManagers = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAddProjectManager = () => {
        setModalOpen(false);
        // Refresh the table or re-fetch data if necessary
    };

    return (
        <div className="p-6 space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Add Project Manager
            </button>
            <ProjectManagerTable />
            <ProjectManagerModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProjectManager}
            />
        </div>
    );
};

export default ProjectManagers;

import { useState, useCallback } from 'react';
import ProjectManagerModal from './ProjectManagerModal';
import ProjectManagerTable from './ProjectManagerTable';

const ProjectManagers = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [managers, setManagers] = useState([]);

    const handleAddProjectManager = useCallback((newManager) => {
        setManagers(prevManagers => [...prevManagers, newManager]);
        setModalOpen(false);
    }, []);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-transform transform hover:scale-105 flex items-center"
            >
                Add Project Manager
            </button>
            <ProjectManagerTable managers={managers} setManagers={setManagers} />
            <ProjectManagerModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProjectManager}
            />
        </div>
    );
};

export default ProjectManagers;
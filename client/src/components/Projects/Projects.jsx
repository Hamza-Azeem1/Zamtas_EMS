import { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import ProjectsTable from './ProjectsTable';
import { FaPlusSquare } from 'react-icons/fa';
import Spinner from '../Spinner';

const Projects = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddProject = () => {
        setModalOpen(false);
        setRefreshKey(prev => prev + 1);
    };


    const fetchData = async () => {
        setIsLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-transform transform hover:scale-105 flex items-center"
                onClick={() => setModalOpen(true)}
            >
                <FaPlusSquare className="mr-2 text-xl" />
                Add New Project
            </button>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : (
                <ProjectsTable key={refreshKey} />
            )}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProject}
            />
        </div>
    );
};

export default Projects;

import { useState, useCallback, useEffect } from 'react';
import ProjectManagerModal from './ProjectManagerModal';
import ProjectManagerTable from './ProjectManagerTable';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import axios from 'axios';
import Api from '../../common/index';
import { RiUserSettingsFill } from "react-icons/ri";

const ProjectManagers = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [managers, setManagers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [managersPerPage] = useState(10);

    const fetchProjectManagers = async () => {
        try {
            const { data } = await axios.get(Api.getProjectManager.url);
            setManagers(data.data);
        } catch (error) {
            console.error('Error fetching project managers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectManagers();
    }, []);

    const handleAddProjectManager = useCallback((newManager) => {
        setManagers(prevManagers => [...prevManagers, newManager]);
        setModalOpen(false);
    }, []);

    // Get current managers
    const indexOfLastManager = currentPage * managersPerPage;
    const indexOfFirstManager = indexOfLastManager - managersPerPage;
    const currentManagers = managers.slice(indexOfFirstManager, indexOfLastManager);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4">
            <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-transform transform hover:scale-105 flex items-center"
            >
                <RiUserSettingsFill className="mr-2 text-xl" />
                Add Project Manager
            </button>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : (
                <>
                    <ProjectManagerTable managers={currentManagers} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(managers.length / managersPerPage)}
                        onPageChange={paginate}
                    />
                </>
            )}
            <ProjectManagerModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddProjectManager}
            />
        </div>
    );
};

export default ProjectManagers;
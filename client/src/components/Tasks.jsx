import { MdOutlineAddTask } from "react-icons/md";

const Tasks = () => {
    return (
        <>
            <div>
                <p>Manage and assign tasks to your employees here.</p>
            </div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 mt-5 flex items-center">
                <MdOutlineAddTask className="mr-2" /> Add New Task
            </button>
        </>
    );
};

export default Tasks;
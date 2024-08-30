import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SIgnIn';
import Home from '../pages/Home';
import UserHome from '../pages/UserHome';
import Dashboard from '../components/Dashboard';
import Employees from '../components/Team/Employees';
import Tasks from '../components/Tasks';
import PageNotFound from '../pages/PageNotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />,
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'employees',
                element: <Employees />,
            },
            {
                path: 'tasks',
                element: <Tasks />,
            },
        ],
    },
    {
        path: '/user-home',
        element: <UserHome />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default router;
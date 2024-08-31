import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import UserHome from '../pages/UserHome';
import Dashboard from '../components/Dashboard';
import Employees from '../components/Team/Employees';
import Tasks from '../components/Task/Tasks';
import PageNotFound from '../pages/PageNotFound';
import ProtectedRoute from '../common/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />,
    },
    {
        path: '/home',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
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
        element: <ProtectedRoute><UserHome /></ProtectedRoute>,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);

export default router;

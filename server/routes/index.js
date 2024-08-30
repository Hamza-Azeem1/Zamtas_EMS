const express = require('express');
const router = express.Router()
const userSignInController = require('../controller/UserSignInController');
const userSignUpController = require('../controller/UserSignUpController');
const getEmployeesController = require('../controller/getEmployeesController');
const { deleteEmployeeController, updateRoleController, getUserDetailsController, updateUserDetailsController } = require('../controller/employeeController');
const upload = require('../config/multer');
const { addProjectController, getProjectsController, checkProjectIdController } = require('../controller/projectController');
const { addClientController, getClientsController } = require('../controller/clientController');
const { addProjectManagerController, getProjectManagersController } = require('../controller/projectManagerController');
const { addTaskController, getTasksController, getProjectDetailsController } = require('../controller/taskController');

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/employees', getEmployeesController);
router.delete('/employees/:id', deleteEmployeeController);
router.put('/employees/:id/role', updateRoleController);
router.get('/employees/:id', getUserDetailsController);
router.put('/employees/:id', upload.single('profilePicture'), updateUserDetailsController);


router.post('/projects', addProjectController);
router.get('/projects', getProjectsController);
router.get('/check-project-id/:projectId', checkProjectIdController);

router.post('/clients', addClientController);
router.get('/clients', getClientsController);

router.post('/project-managers', addProjectManagerController);
router.get('/project-managers', getProjectManagersController);


router.post('/tasks', addTaskController);
router.get('/tasks', getTasksController);
router.get('/projects/:projectId', getProjectDetailsController);


module.exports = router
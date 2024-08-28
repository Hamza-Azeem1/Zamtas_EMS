const express = require('express');
const router = express.Router()
const userSignInController = require('../controller/UserSignInController');
const userSignUpController = require('../controller/UserSignUpController');
const getEmployeesController = require('../controller/getEmployeesController');
const { deleteEmployeeController, updateRoleController, getUserDetailsController, updateUserDetailsController } = require('../controller/employeeController');
const upload = require('../config/multer');

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/employees', getEmployeesController);
router.delete('/employees/:id', deleteEmployeeController);
router.put('/employees/:id/role', updateRoleController);
router.get('/employees/:id', getUserDetailsController);
router.put('/employees/:id', upload.single('profilePicture'), updateUserDetailsController);


module.exports = router
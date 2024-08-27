const express = require('express');
const router = express.Router()
const userSignInController = require('../controller/UserSignInController');
const userSignUpController = require('../controller/UserSignUpController');
const getEmployeesController = require('../controller/getEmployeesController');
const deleteEmployeeController = require('../controller/employeeController');

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);
router.get('/employees', getEmployeesController);
router.delete('/employees/:id', deleteEmployeeController);

module.exports = router
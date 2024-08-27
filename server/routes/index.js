const express = require('express');
const router = express.Router()
const userSignInController = require('../controller/UserSignInController');
const userSignUpController = require('../controller/UserSignUpController');

router.post('/sign-up', userSignUpController);
router.post('/sign-in', userSignInController);

module.exports = router
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!validatePassword(password)) {
            throw new Error("Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User Already Exist!.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateAlphabetic(value) {
    return /^[a-zA-Z\s]+$/.test(value);
}

function validateNumeric(value) {
    return /^\d+$/.test(value);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAlphanumeric(value) {
    return /^[a-zA-Z0-9\s]+$/.test(value);
}

async function userSignUpController(req, res) {
    // Use multer middleware for file upload
    upload.single('profilePicture')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message, error: true, success: false });
        }

        try {
            const { email, password, name, designation, department, dob, mobileNo, address, cnic } = req.body;

            const profilePicture = req.file ? req.file.path : undefined;

            // Check for required fields
            if (!email || !password || !name || !designation || !department) {
                return res.status(400).json({ message: "Missing required fields!", error: true, success: false });
            }

            // Validate email
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Invalid email format.", error: true, success: false });
            }

            // Validate password
            if (!validatePassword(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.", error: true, success: false });
            }

            // Validate name, designation, and department (alphabetic only)
            if (!validateAlphabetic(name) || !validateAlphabetic(designation) || !validateAlphabetic(department)) {
                return res.status(400).json({ message: "Name, designation, and department should contain only alphabetic characters.", error: true, success: false });
            }

            // Validate mobileNo and cnic (numeric only)
            if (mobileNo && !validateNumeric(mobileNo)) {
                return res.status(400).json({ message: "Mobile number should contain only numeric characters.", error: true, success: false });
            }
            if (cnic && !validateNumeric(cnic)) {
                return res.status(400).json({ message: "CNIC should contain only numeric characters.", error: true, success: false });
            }

            // Validate address (alphanumeric)
            if (address && !validateAlphanumeric(address)) {
                return res.status(400).json({ message: "Address should contain only alphanumeric characters.", error: true, success: false });
            }

            const user = await userModel.findOne({ email });

            if (user) {
                return res.status(400).json({ message: "User already exists with this email.", error: true, success: false });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);

            if (!hashPassword) {
                return res.status(400).json({ message: "Error hashing the password.", error: true, success: false });
            }

            const payload = {
                email,
                password: hashPassword,
                name,
                designation,
                department,
                dob: dob ? new Date(dob) : undefined,
                mobileNo,
                address,
                cnic,
                role: "GENERAL",
                profilePicture
            };

            const userData = new userModel(payload);
            const saveUser = await userData.save();

            res.status(201).json({
                data: saveUser,
                success: true,
                error: false,
                message: "User created successfully!"
            });
        } catch (err) {
            res.status(400).json({
                message: err.message || "An error occurred.",
                error: true,
                success: false,
            });
        }
    });
}

module.exports = userSignUpController;

const userModel = require('../models/userModel');

async function deleteEmployeeController(req, res) {
    const { id } = req.params;

    try {
        const employee = await userModel.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Server Error',
            error: true,
            success: false
        });
    }
}

module.exports = deleteEmployeeController;

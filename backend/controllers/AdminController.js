const { adminAuth } = require("../services");
const { loginAdmin, registerAdmin } = adminAuth;

const registerController = async (req, res, next) => {
	const { username, password } = req.body;
    try {
        const admin = await registerAdmin(username, password);
        res.status(201).json({ message: 'Admin registered successfully', adminId: admin._id });
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to register admin: ' + error.message;
        next(error);
    }
}

const loginController = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const { token, role } = await loginAdmin(username, password);
		res.status(200).json({ token, role });
	} catch (error) {
		error.statusCode = 400;
		error.message = "Failed to login: " + error.message;
		next(error);
	}
};

module.exports = {
	loginController,
	registerController
};

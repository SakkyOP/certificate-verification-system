const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "Shh... It's a secret!";

// Register a new admin
const registerAdmin = async (username, password) => {
	const admin = new Admin({ username, password });
	await admin.save();
	return admin;
};

// Login an admin and generate a JWT
const loginAdmin = async (username, password) => {
	const admin = await Admin.findOne({ username });
	if (!admin || !(await admin.comparePassword(password))) {
		throw new Error("Invalid credentials");
	}

	const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
		expiresIn: "1h",
	});
	return { token, role: "admin" };
};

module.exports = {
	registerAdmin,
	loginAdmin,
};

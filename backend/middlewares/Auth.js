const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Shh... It's a secret!";

// Middleware to authenticate admin JWT
const authenticateAdmin = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		const error = new Error("Access Denied!");
		error.statusCode = 401;
		next(error);
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err || decoded.role !== "admin") {
			if (!err) {
				err = new Error("Invalid token");
				err.statusCode = 401;
			}
			next(err);
		}

		req.user = decoded;
		next();
	});
};

module.exports = authenticateAdmin;

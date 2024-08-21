const errorHandler = require("./ErrorMiddleware");
const authenticateAdmin = require("./ErrorMiddleware");

module.exports = {
	errorHandler,
	authenticateAdmin,
};

require('dotenv').config();
const storage = require("./FileStorage");
const adminAuth = require("./AdminAuthService");
const connectdb = require("./Database");
const processExcelFiles = require("./DataExtractor");

module.exports = {
	storage,
	adminAuth,
	connectdb,
	processExcelFiles,
};

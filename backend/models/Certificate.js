const mongoose = require("mongoose");

// Certificate Schema
const certificateSchema = new mongoose.Schema({
	certificateId: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	internshipDomain: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);

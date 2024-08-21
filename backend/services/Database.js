const mongoose = require("mongoose");

const connectdb = () => {
	// Connect to MongoDB
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log("Connected to MongoDB"))
		.catch((err) => {
			console.log(`${err.message}`);
		});
};

module.exports = connectdb;

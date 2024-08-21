const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares");
const { connectdb } = require("./services");
const router = require("./routers");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = (module.exports = express());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectdb();

app.use("/api/v1", router);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Listening on Port: ${PORT}`);
});

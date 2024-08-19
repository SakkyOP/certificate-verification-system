const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "..", "temp"));
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname );
    }
})

const fileFilter = (req, file, cb) => {
    if (["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(file.mimetype)) cb(null, true);
    else cb(null, false);
}

module.exports = multer({
    storage,
    fileFilter
})
const router = require("express").Router();
const { storage } = require("../services");
const { authenticateAdmin } = require("../middlewares");
const { certificateController } = require("../controllers");
const {
	getCertificate,
	singleCertificate,
	multipleCertificates,
	editCertificate,
	deleteCertificate,
	uploadCertificate,
} = certificateController;

// Get Certificates
router.get("/:certificateId", getCertificate);

// Authentication Middleware
router.use(authenticateAdmin);

// Add, Edit, Delete Certificates
router.post("/", singleCertificate);
router.post("/bulk", multipleCertificates);
router.post("/upload", storage.any("excel"), uploadCertificate);

router.put("/:id", editCertificate);
router.delete("/:id", deleteCertificate);

module.exports = router;

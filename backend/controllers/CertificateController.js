const { Certificate } = require("../models");
const { processExcelFiles } = require("../services");

module.exports = {
	getCertificate: async (req, res, next) => {
		const { certificateId } = req.params;

		try {
			const certificate = await Certificate.findOne({ certificateId });
			if (!certificate) {
				const error = new Error("Certificate not found");
				error.statusCode = 404;
				throw error;
			}

			res.status(200).json(certificate);
		} catch (error) {
			next(error);
		}
	},
	getAllCertificates: async (req, res, next) => {
		try {
			const certificates = await Certificate.find();
			if (!certificates) {
				const error = new Error("Certificate not found");
				error.statusCode = 404;
				throw error;
			}

			res.status(200).json({ sucess: true, certificates });
		} catch (error) {
			next(error);
		}
	},
	singleCertificate: async (req, res, next) => {
		const {
			certificateId,
			firstName,
			lastName,
			internshipDomain,
			startDate,
			endDate,
		} = req.body;

		try {
			const certificate = new Certificate({
				certificateId,
				firstName,
				lastName,
				internshipDomain,
				startDate,
				endDate,
			});
			await certificate.save();
			res.status(201).json({
				message: "Certificate added successfully",
				certificateId: certificate.certificateId,
			});
		} catch (error) {
			error.statusCode = 400;
			error.message = "Failed to add certificate: " + error.message;
			next(error);
		}
	},
	multipleCertificates: async (req, res, next) => {
		const { certificates } = req.body; // Expecting an array of certificates

		try {
			if (!Array.isArray(certificates) || certificates.length === 0) {
				const error = new Error(
					"Invalid input: Please provide an array of certificates"
				);
				error.statusCode = 400;
				throw error;
			}

			const createdCertificates = [];
			for (let certData of certificates) {
				const {
					certificateId,
					firstName,
					lastName,
					internshipDomain,
					startDate,
					endDate,
				} = certData;
				const certificate = new Certificate({
					certificateId,
					firstName,
					lastName,
					internshipDomain,
					startDate,
					endDate,
				});
				await certificate.save();
				createdCertificates.push(certificate);
			}

			res.status(201).json({
				message: "Certificates added successfully",
				createdCertificates,
			});
		} catch (error) {
			error.statusCode = 400;
			error.message = "Failed to add certificates: " + error.message;
			next(error);
		}
	},
	editCertificate: async (req, res, next) => {
		const { id } = req.params;
		const { firstName, lastName, internshipDomain, startDate, endDate } =
			req.body;

		try {
			const certificate = await Certificate.findById(id);
			if (!certificate) {
				const error = new Error("Certificate not found");
				error.statusCode = 404;
				throw error;
			}

			// Update fields if provided
			if (firstName) certificate.firstName = firstName;
			if (lastName) certificate.lastName = lastName;
			if (internshipDomain)
				certificate.internshipDomain = internshipDomain;
			if (startDate) certificate.startDate = startDate;
			if (endDate) certificate.endDate = endDate;

			await certificate.save();
			res.status(200).json({
				message: "Certificate updated successfully",
				certificate,
			});
		} catch (error) {
			next(error);
		}
	},
	deleteCertificate: async (req, res, next) => {
		const { id } = req.params;

		try {
			const certificate = await Certificate.findById(id);
			if (!certificate) {
				const error = new Error("Certificate not found");
				error.statusCode = 404;
				throw error;
			}

			await certificate.deleteOne();
			res.status(200).json({
				message: "Certificate deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	},
	uploadCertificate: async (req, res, next) => {
		try {
			const certificates = await processExcelFiles();
			const createdCertificates = [];
			for (let certData of certificates) {
				const {
					certificateId,
					firstName,
					lastName,
					internshipDomain,
					startDate,
					endDate,
				} = certData;
				const certificate = new Certificate({
					certificateId,
					firstName,
					lastName,
					internshipDomain,
					startDate,
					endDate,
				});
				await certificate.save();
				createdCertificates.push(certificate);
			}

			res.status(201).json({
				message: "Certificates added successfully",
				createdCertificates,
			});
		} catch (error) {
			next(error); // Pass errors to your error handling middleware
		}
	},
};

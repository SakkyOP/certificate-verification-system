const fs = require('fs-extra');
const path = require('path');
const xlsx = require('xlsx');

const tempFolder = path.join(__dirname, '../temp'); // Adjust the path to your temp folder

module.exports = processExcelFiles = async () => {
    const files = await fs.readdir(tempFolder);
    const certificates = [];

    for (const file of files) {
        const filePath = path.join(tempFolder, file);

        // Only process Excel files
        if (path.extname(filePath) === '.xlsx') {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            jsonData.forEach(row => {
                const certificate = {
                    certificateId: row['Certificate ID'] || row['certificateId'],
                    firstName: row['First Name'] || row['firstName'],
                    lastName: row['Last Name'] || row['lastName'],
                    internshipDomain: row['Internship Domain'] || row['internshipDomain'],
                    startDate: row['Start Date'] || row['startDate'],
                    endDate: row['End Date'] || row['endDate'],
                };
                certificates.push(certificate);
            });

            // Delete the file after processing
            await fs.remove(filePath);
        }
    }

    return certificates;
}
const fs = require('fs-extra');
const path = require('path');
const xlsx = require('xlsx');

const tempFolder = path.join(__dirname, '../temp'); // Adjust the path to your temp folder


function parseDate(value) {
    if (typeof value === 'number') {
        // Handle Excel date codes
        const parsedDate = xlsx.SSF.parse_date_code(value);
        if (parsedDate) {
            const { y, m, d, H = 0, M = 0, S = 0 } = parsedDate;
            return new Date(y, m - 1, d, H, M, S); // Convert to JavaScript Date
        }
        return null;
    } else if (typeof value === 'string') {
        const formats = [
            'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 
            'MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD'
        ];
        const date = moment(value, formats, true).toDate();
        return isNaN(date.getTime()) ? null : date;
    }
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
}

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
                    certificateId: row['Certificate ID'],
                    firstName: row['First Name'],
                    lastName: row['Last Name'],
                    internshipDomain: row['Internship Domain'],
                    startDate: parseDate(row['Start Date']),
                    endDate: parseDate(row['End Date']),
                };
                certificates.push(certificate);
            });

            // Delete the file after processing
            await fs.remove(filePath);
        }
    }

    return certificates;
}
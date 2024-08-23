/* eslint-disable react/prop-types */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/CertificateTemplate.css';

function CertificateTemplate({ data }) {
    const { firstName, lastName, internshipDomain, startDate, endDate } = data;
    
    const duration = `${startDate} to ${endDate}`;
    const fullName = `${firstName} ${lastName}`;
    
    const downloadPDF = () => {
        const input = document.getElementById('certificate');

        html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('certificate.pdf');
        });
    };

    return (
        <div>
            <div id="certificate">
                <h1>Certificate of Completion</h1>
                <p>
                    This is to certify that <strong>{fullName}</strong> has successfully completed the internship in <strong>{internshipDomain}</strong> for the duration <strong>{duration}</strong>.
                </p>
                <p>
                    We acknowledge their dedication, hard work, and valuable contributions during the internship period.
                </p>
                <div className="signature-container">
                    <p className="signature">Signature of the Authority</p>
                </div>
            </div>
            <button onClick={downloadPDF} className="download-button">Download as PDF</button>
        </div>
    );
}

export default CertificateTemplate;

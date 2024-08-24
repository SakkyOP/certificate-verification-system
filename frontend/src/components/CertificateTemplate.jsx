/* eslint-disable react/prop-types */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../styles/CertificateTemplate.css';
import vfv from '../image/zidio1.png'


function CertificateTemplate({ data }) {
    const { firstName, lastName, internshipDomain, startDate: startD, endDate: endD } = data;
    
    const startDate = (new Date(startD)).toLocaleDateString();
    const endDate = (new Date(endD)).toLocaleDateString();

    const fullName = `${firstName} ${lastName}`;
    
    const downloadPDF = () => {
        const input = document.getElementById('certificate');

        html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 10, 22);
            pdf.save('certificate.pdf');
        });
    };

    return (
        <div>
            <div id="certificate">
                <img src={vfv}/>
                <h1>Certificate of Completion</h1>
                <p>
                    This is to certify that <strong>{fullName}</strong> has successfully completed the internship in <strong>{internshipDomain}</strong> for the duration <strong>{startDate}</strong> to <strong>{endDate}</strong>.
                </p>
                <p>
                    We acknowledge their dedication, hard work, and valuable contributions during the internship period.
                </p>
            </div>
            <button onClick={downloadPDF} className="download-button">Download as PDF</button>
        </div>
    );
}

export default CertificateTemplate;

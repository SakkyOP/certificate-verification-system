/* eslint-disable react/prop-types */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
            <div id="certificate" style={styles.certificateContainer}>
                <h1 style={styles.title}>Certificate of Completion</h1>
                <p style={styles.text}>
                    This is to certify that <strong>{fullName}</strong> has successfully completed the internship in <strong>{internshipDomain}</strong> for the duration <strong>{duration}</strong>.
                </p>
                <p style={styles.text}>
                    We acknowledge their dedication, hard work, and valuable contributions during the internship period.
                </p>
                <div style={styles.signatureContainer}>
                    <p style={styles.signature}>Signature of the Authority</p>
                </div>
            </div>
            <button onClick={downloadPDF} style={styles.downloadButton}>Download as PDF</button>
        </div>
    );
}

const styles = {
    certificateContainer: {
        border: '2px solid black',
        padding: '30px',
        width: '800px',
        margin: '20px auto',
        backgroundColor: '#f3f4f6',
        textAlign: 'center',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    text: {
        fontSize: '18px',
        lineHeight: '1.5',
        margin: '20px 0',
    },
    signatureContainer: {
        marginTop: '50px',
        textAlign: 'right',
    },
    signature: {
        fontSize: '18px',
        fontStyle: 'italic',
    },
    downloadButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '18px',
        cursor: 'pointer',
    },
};

export default CertificateTemplate;

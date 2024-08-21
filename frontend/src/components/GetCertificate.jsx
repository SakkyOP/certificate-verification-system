import { useState } from 'react';
import axios from 'axios';
import CertificateTemplate from './CertificateTemplate';

function GetCertificate() {
    const [certificateId, setCertificateId] = useState('');
    const [certificateData, setCertificateData] = useState(null);

    const fetchCertificate = async () => {
        try {
            const response = await axios.get(`/api/v1/certificates/${certificateId}`);
            setCertificateData(response.data);
        } catch (error) {
            console.error(error);
            alert('Certificate not found.');
        }
    };

    return (
        <div>
            <h2>Get Your Certificate</h2>
            <input 
                type="text" 
                placeholder="Enter Certificate ID" 
                value={certificateId} 
                onChange={(e) => setCertificateId(e.target.value)} 
            />
            <button onClick={fetchCertificate}>Get Certificate</button>
            
            {certificateData && <CertificateTemplate data={certificateData} />}
        </div>
    );
}

export default GetCertificate;

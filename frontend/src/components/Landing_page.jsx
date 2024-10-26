import React from 'react';
import '../styles/LandingPage.css';
import certificateVerificationImage from '../image/zidio1.png'; // Image 1
import secureSystemImage from '../image/zidio1.png'; // Image 2
import trustImage from '../image/zidio2.png'; // Image 3

function LandingPage() {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>Certificate Verification System</h1>
                <p>Here you verify and download your certificates easily and securely.</p>
                <a href="/certificate" className="verify-button">Get Certificate</a>
            </header>

            <section className="features-section">
                <h2>Why Choose Our System?</h2>
                <div className="features">
                    <div className="feature-card">
                        <img src={certificateVerificationImage} alt="Certificate Verification" />
                        <h3>Instant Verification</h3>
                        <p>Get immediate results by verifying certificates within seconds.</p>
                    </div>
                    <div className="feature-card">
                        <img src={secureSystemImage} alt="Secure System" />
                        <h3>Secure & Reliable</h3>
                        <p>Our system is built with security as the top priority, ensuring data integrity and safety.</p>
                    </div>
                    <div className="feature-card">
                        <img src={trustImage} alt="Trust & Authenticity" />
                        <h3>Trusted by Institutions</h3>
                        <p>Hundreds of institutions trust our system to verify certificates accurately.</p>
                    </div>
                </div>
            </section>

            {/* <section id="verify" className="verify-section">
                <h2>Verify a Certificate</h2>
                <form className="verify-form">
                    <input type="text" placeholder="Enter Certificate ID" required />
                    <button type="submit">Verify</button>
                </form>
            </section> */}


            <footer className="footer">
                <p>© 2024 Certificate Verification System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;

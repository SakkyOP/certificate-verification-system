import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import GetCertificate from './components/GetCertificate';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRotue';
import axios from 'axios';
import LandingPage from './components/Landing_page';
axios.defaults.baseURL = 'http://localhost:5000'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/certificate" element={<GetCertificate />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route 
                    path="/admin-dashboard" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;

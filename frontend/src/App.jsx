import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import GetCertificate from './components/GetCertificate';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRotue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:298'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GetCertificate />} />
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

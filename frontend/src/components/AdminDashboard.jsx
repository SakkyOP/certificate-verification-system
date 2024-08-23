import { useState, useEffect } from "react";
import axios from "axios";
import StudentTable from "./StudentTable";
import '../styles/AdminDashboard.css';

function AdminDashboard() {
    const [files, setFiles] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get("/api/v1/certificates");
            setStudents(response.data.certificates);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        for (let file of files) {
            formData.append("excel", file);
        }

        try {
            await axios.post("/api/v1/certificates/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchStudentData(); // Refresh student data after upload
            alert("Files uploaded successfully!");
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("File upload failed.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>

            <div>
                <h3>Upload Certificates</h3>
                <input type="file" multiple onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <div>
                <h3>Search Student Records</h3>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <StudentTable
                students={students.filter((student) =>
                    `${student.firstName} ${student.lastName}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )}
                fetchStudentData={fetchStudentData}
            />
        </div>
    );
}

export default AdminDashboard;

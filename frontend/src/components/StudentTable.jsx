/* eslint-disable react/prop-types */
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import axios from "axios";

function StudentTable({ students, fetchStudentData }) {
	const handleEdit = (id) => {
		// Implement edit functionality here
		const newName = prompt("Enter the new name for this student:");
		if (newName) {
			const [firstName, lastName] = newName.split(" ");
			axios
				.put(`/api/v1/certificates/${id}`, { firstName, lastName })
				.then(() => {
					alert("Student updated successfully!");
					fetchStudentData();
				})
				.catch((error) => {
					console.error(
						"There was an error updating the student!",
						error
					);
				});
		}
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this record?")) {
			axios
				.delete(`/api/v1/certificates/${id}`)
				.then(() => {
					alert("Student record deleted successfully!");
					fetchStudentData();
				})
				.catch((error) => {
					console.error(
						"There was an error deleting the student!",
						error
					);
				});
		}
	};

	return (
		<table>
			<thead>
				<tr>
					<th>Certificate ID</th>
					<th>Full Name</th>
					<th>Internship Domain</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{students.map((student) => (
					<tr key={student.certificateId}>
						<td>{student.certificateId}</td>
						<td>
							{student.firstName} {student.lastName}
						</td>
						<td>{student.internshipDomain}</td>
						<td>{moment(student.startDate).format("DD/MM/YY")}</td>
						<td>{moment(student.endDate).format("DD/MM/YY")}</td>
						<td>
							<FaEdit
								style={{
									cursor: "pointer",
									marginRight: "10px",
								}}
								onClick={() => handleEdit(student._id)}
							/>
							<FaTrashAlt
								style={{ cursor: "pointer" }}
								onClick={() => handleDelete(student._id)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default StudentTable;

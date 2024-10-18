import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState(null); // Changed initial state to null
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeDetail = async () => {
            try {
                const result = await axios.get(`http://localhost:3002/employee/detail/${id}`);
                if (result.data && result.data.length > 0) {
                    setEmployee(result.data[0]);
                } else {
                    alert("Employee not found");
                }
            } catch (err) {
                console.error("Error fetching employee detail:", err);
                alert("Failed to fetch employee details.");
            }
        };

        fetchEmployeeDetail();
    }, [id]);

    const handleLogout = async () => {
        try {
            const result = await axios.get('http://localhost:3002/employee/logout');
            if (result.data.Status) {
                localStorage.removeItem("valid");
                navigate('/');
            }
        } catch (err) {
            console.error("Error during logout:", err);
            alert("Failed to logout. Please try again.");
        }
    };

    if (!employee) {
        return <div className="text-center mt-5">Loading...</div>; // Loading state
    }

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>HR Nexus - Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <img 
                    src={`http://localhost:3002/Images/${employee.image}`} 
                    alt={employee.name} 
                    className='emp_det_image' 
                />
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div>
                    <button 
                        className='btn btn-info me-2' 
                        onClick={() => navigate(`/dashboard/edit_employee/${employee.id}`)} // Navigate to edit
                    >
                        Edit
                    </button>
                    <button 
                        className='btn btn-danger' 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const result = await axios.get('http://localhost:3002/auth/category');
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

        // Fetch employee data
        const fetchEmployee = async () => {
            try {
                const result = await axios.get(`http://localhost:3002/auth/employee/${id}`);
                if (result.data.Status) {
                    setEmployee({
                        name: result.data.Result.name,
                        email: result.data.Result.email,
                        address: result.data.Result.address,
                        salary: result.data.Result.salary,
                        category_id: result.data.Result.category_id,
                    });
                } else {
                    alert(result.data.Error);
                }
            } catch (err) {
                console.error('Failed to fetch employee:', err);
            }
        };

        fetchCategories();
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put(`http://localhost:3002/auth/edit_employee/${id}`, employee);
            if (result.data.Status) {
                navigate('/dashboard/employee');
            } else {
                alert(result.data.Error);
            }
        } catch (err) {
            console.error('Failed to edit employee:', err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={employee.salary}
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            value={employee.address}
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select 
                            name="category" 
                            id="category" 
                            className="form-select"
                            value={employee.category_id} // Set selected category
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                        >
                            {category.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option> // Use _id for MongoDB
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;

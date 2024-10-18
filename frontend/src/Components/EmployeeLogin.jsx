import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reset error message before new request
        try {
            const result = await axios.post('http://localhost:3002/employee/employee_login', values);
            if (result.data.loginStatus) {
                localStorage.setItem("valid", true);
                navigate(`/employee_detail/${result.data.id}`);
            } else {
                setError(result.data.Error);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && <p>{error}</p>}
                </div>
                <h2 className='text-center'>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input 
                            type="email" 
                            name='email' 
                            autoComplete='off' 
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} 
                            className='form-control rounded-0'
                            required // Added required attribute for better UX
                        />
                    </div>
                    <div className='mb-3'> 
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} 
                            className='form-control rounded-0'
                            required // Added required attribute for better UX
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'> 
                        <input type="checkbox" name="tick" id="tick" className='me-2'/>
                        <label htmlFor="tick">You agree to the terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState(''); // Initialize with an empty string
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Trim the category to remove whitespace
        const trimmedCategory = category.trim();

        // Check if the trimmed category is empty
        if (!trimmedCategory) {
            alert('Category name cannot be empty.');
            return;
        }

        axios.post('http://localhost:3002/auth/add_category', { category: trimmedCategory })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category');
                } else {
                    alert(result.data.Error || 'Failed to add category.'); // Handle generic error
                }
            })
            .catch(err => {
                console.error(err);
                alert('An error occurred while adding the category. Please try again.'); // More user-friendly error
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input
                            type="text"
                            name='category'
                            placeholder='Enter Category'
                            onChange={(e) => setCategory(e.target.value)}
                            className='form-control rounded-0'
                            required // Ensuring the field is required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;

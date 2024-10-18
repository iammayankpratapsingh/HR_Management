import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await axios.get('http://localhost:3002/auth/category');
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    setError(result.data.Error); // Set error state if there is an error
                }
            } catch (err) {
                setError("Failed to fetch categories."); // Set error state for network issues
            } finally {
                setLoading(false); // Set loading to false after the request is completed
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            <div className='mt-3'>
                {loading ? (
                    <p>Loading categories...</p> // Display loading message
                ) : error ? (
                    <p className="text-danger">{error}</p> // Display error message
                ) : category.length === 0 ? (
                    <p>No categories available.</p> // Message when no categories are available
                ) : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((c) => (
                                <tr key={c.id}> {/* Add a unique key for each category */}
                                    <td>{c.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Category;

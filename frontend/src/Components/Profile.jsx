import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3002/auth/profile', { withCredentials: true });
        if (response.data.Status) {
          setUser(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No profile information available.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>User Profile</h3>
      <div className="card p-3">
        <h5>Name: {user.name}</h5>
        <h5>Email: {user.email}</h5>
        <h5>Address: {user.address}</h5>
        <h5>Salary: ${user.salary}</h5>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default Profile;

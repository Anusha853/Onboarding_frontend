import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;

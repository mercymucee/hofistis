import React, { useState } from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem('user');
    console.log('User logged out');
    // Redirect to login or home page
  };

  return (
    <div className="container">
      <h1>Logout</h1>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

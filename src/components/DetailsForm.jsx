// DetailsForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a password or token (for simplicity, using a static password here)
    const generatedPassword = 'specialPassword123'; // This should ideally come from a secure server-side process

    // Redirect to Add Products page with the password passed in the state
    navigate('/addproducts', { state: { password: generatedPassword } });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center">Enter Details to Get Password</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Get Password
        </button>
      </form>
    </div>
  );
};

export default DetailsForm;

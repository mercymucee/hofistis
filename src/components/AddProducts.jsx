import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddProducts = () => {
  const [product_name, setProductName] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [product_cost, setProductCost] = useState('');
  const [product_photo, setProductPhoto] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if password is correct
  const [passwordPromptVisible, setPasswordPromptVisible] = useState(true); // To control visibility of the password prompt

  const correctPassword = 'specialPassword123'; // Set the correct password here

  // Handle password submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setIsAuthenticated(true); // Set authentication to true if password matches
      setPasswordPromptVisible(false); // Hide the password prompt after successful authentication
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Handle product submission
  const submit = async (e) => {
    e.preventDefault();
    setLoading('Please wait as we upload your data...');
    try {
      const data = new FormData();
      data.append('product_name', product_name);
      data.append('product_description', product_description);
      data.append('product_cost', product_cost);
      data.append('product_photo', product_photo);

      const response = await axios.post(
        'https://mercymucee.pythonanywhere.com/api/add_product',
        data
      );
      setLoading('');
      setSuccess(response.data.message);
      console.log(response);
    } catch (error) {
      setLoading('');
      setError(error.message);
    }
  };

  // Handle password form close
  const handleExit = () => {
    setPasswordPromptVisible(false); // Hide the password prompt
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 p-4 card shadow" style={{ position: 'relative' }}>
        <h2>Add Products</h2>
        <nav className="m-4">
          <Link to="/" className="btn btn-dark">
            GET ALL PRODUCTS
          </Link>
        </nav>

        {/* Display Loading, Success, or Error messages */}
        <p className="text-warning">{loading}</p>
        <p className="text-success">{success}</p>
        <p className="text-danger">{error}</p>

        {/* Tiny Password Prompt (Visible before authentication) */}
        {passwordPromptVisible && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px', // Position at the top right corner
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              zIndex: 10, // Ensure it's above other content but does not block important areas
              width: '200px', // Small width
              textAlign: 'center',
              fontSize: '14px', // Smaller font size
            }}
          >
            <p style={{ fontSize: '14px', color: '#17a2b8' }}>
              Enter password to upload products:
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Password"
                className="form-control form-control-sm" // Smaller form input
                required
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                style={{ fontSize: '14px', padding: '5px' }}
              />
              <br />
              <button type="submit" className="btn btn-primary btn-sm w-100" style={{ fontSize: '12px' }}>
                Submit
              </button>
            </form>
            <p className="text-danger" style={{ fontSize: '12px' }}>{error}</p>

            {/* Exit Badge */}
            <span
              onClick={handleExit}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                fontSize: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 20,
              }}
            >
              X
            </span>
          </div>
        )}

        {/* Product Upload Form (Visible only after correct password) */}
        {isAuthenticated && (
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Product name"
              className="form-control"
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
            <br />
            <textarea
              placeholder="Product Description"
              className="form-control"
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
            <br />
            <input
              type="number"
              placeholder="Product cost"
              className="form-control"
              required
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)}
            />
            <br />
            <input
              type="file"
              className="form-control"
              required
              onChange={(e) => setProductPhoto(e.target.files[0])}
              accept="image/*"
            />
            <br />
            <br />
            <button type="submit" className="btn btn-primary w-100">
              Add Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProducts;

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MpesaPayment = () => {
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { product } = useLocation().state || {};

  // Validate phone number
  const validatePhone = (phone) => {
    // Ensure the phone number starts with 254 and is 12 digits long
    return /^254\d{9}$/.test(phone);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading('Processing payment...');
    setMessage('');
    setError('');

    if (!validatePhone(phone)) {
      setLoading('');
      setError('Invalid phone number. Please enter a valid Kenyan phone number starting with 254.');
      return;
    }

    try {
      const data = new FormData();
      data.append('phone', phone);
      data.append('amount', product.product_cost);

      const response = await axios.post('https://mercymucee.pythonanywhere.com/api/mpesa_payment', data);
      setLoading('');
      setMessage(response.data.message);
    } catch (error) {
      setLoading('');
      setError(error.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <div className="row justify-content-center">
      <h2 className="mt-4">M-Pesa Payment - Lipa na M-Pesa</h2>

      <div className="col-md-6 card shadow">
        <p className="text-info">Product name: {product?.product_name}</p>
        <p className="text-warning">Product cost: KSh {product?.product_cost}</p>

        <form onSubmit={submit}>
          {/* Show loading, error, or success messages */}
          {loading && <p className="text-info">{loading}</p>}
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <input
            type="tel"
            placeholder="254xxxxxxxxx"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <br />
          <br />
          <button className="btn btn-dark" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Make Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MpesaPayment;

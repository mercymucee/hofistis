import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaStar } from 'react-icons/fa';
import axios from 'axios';
import Chatbot from './Chatbot';
import Carousel from './Carousel';
import ReturnToHofistis from './ReturnToHofistis';

const GetProducts = () => {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch products from API
  const get_products = async () => {
    setLoading('Please wait as we load the products...');
    try {
      const response = await axios.get('https://mercymucee.pythonanywhere.com/api/get_products_details');
      setProducts(response.data);
      setLoading('');
    } catch (error) {
      setLoading('');
      setError('Failed to load products. Please try again later.');
      console.error(error);
    }
  };

  useEffect(() => {
    get_products();
  }, []);

  // Base URL for product images
  const img_url = 'https://mercymucee.pythonanywhere.com/static/images/';

  // Format price as currency
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);

  return (
    <div className="container py-4">
      <ReturnToHofistis />
      <Carousel />

      <h1 className="mb-4 text-center" style={{ color: '#28a745' }}>
        Available Products
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control shadow-sm mb-4 p-2"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Loading and Error Messages */}
      {loading && <p>{loading}</p>}
      {error && <p style={{ color: '#e63946' }}>{error}</p>}

      <div className="row">
        {/* Filter and Map Products */}
        {products
          .filter((product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
              <div
                className="card shadow-sm h-100 position-relative"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f9fa',
                }}
              >
                {/* 5% OFF Badge */}
                <span
                  className="badge bg-danger"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    zIndex: 1,
                  }}
                >
                  5% OFF
                </span>

                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{product.product_name}</h5>
                  <p style={{ fontSize: '0.9rem' }}>{product.product_description}</p>

                  {/* Display original and discounted price */}
                  <div className="mb-2">
                    <span className="text-muted me-2" style={{ textDecoration: 'line-through' }}>
                      {formatPrice(product.product_cost)}
                    </span>
                    <b className="text-warning">
                      {formatPrice(product.product_cost * 0.95)} {/* 5% discount */}
                    </b>
                  </div>

                  {/* Purchase Button */}
                  <button
                    className="btn mt-auto text-white"
                    style={{ backgroundColor: '#28a745' }}
                    onClick={() => navigate('/mpesapayment', { state: { product } })}
                  >
                    <FaDollarSign className="me-2" /> Purchase Now
                  </button>

                  {/* Write Review Button */}
                  <button
                    className="btn mt-2 btn-outline-warning"
                    onClick={() =>
                      navigate('/review', {
                        state: { productId: product.id, productImage: product.product_photo },
                      })
                    }
                  >
                    <FaStar className="me-2" /> Write Review
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Chatbot Floating Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Chatbot />
      </div>
    </div>
  );
};

export default GetProducts;

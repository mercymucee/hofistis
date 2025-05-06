import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import Chatbot from './Chatbot';

const Getproducts = () => {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productMessage, setProductMessage] = useState({});
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Fetch products from the API
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

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const img_url = 'https://mercymucee.pythonanywhere.com/static/images/';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  };

  const handleAddToCart = (product) => {
    setProductMessage((prev) => ({
      ...prev,
      [product.id]: 'Adding to cart...',
    }));

    setTimeout(() => {
      addToCart(product);
      setProductMessage((prev) => ({
        ...prev,
        [product.id]: 'Product added to cart successfully!',
      }));
      setTimeout(() => {
        setProductMessage((prev) => ({
          ...prev,
          [product.id]: '',
        }));
      }, 2000);
    }, 1000);
  };

  // Navigate to review page with product data
  const handleWriteReview = (product) => {
    navigate('/review', {
      state: {
        productId: product.id,
        productName: product.product_name,
        productDescription: product.product_description,
        productImage: product.product_photo,
      },
    });
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center" style={{ color: '#28a745' }}>Available Products</h1>

      <input
        type="text"
        className="form-control shadow-sm mb-4 p-2"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p>{loading}</p>}
      {error && <p style={{ color: '#e63946' }}>{error}</p>}

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
            <div
              className="card shadow-sm h-100 position-relative"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#f8f9fa',
              }}
            >
              <span
                className="badge position-absolute"
                style={{
                  top: '10px',
                  left: '10px',
                  backgroundColor: '#e63946',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  padding: '6px 10px',
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
                <h5 style={{ color: '#212529' }}>
                  {product.product_name}
                </h5>
                <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  {product.product_description}
                </p>

                <b style={{ color: '#ffc107' }}>{formatPrice(product.product_cost)}</b>

                <button
                  className="btn mt-3 text-white"
                  style={{ backgroundColor: '#28a745' }}
                  onClick={() => navigate('/mpesapayment', { state: { product } })}
                >
                  <FaDollarSign className="me-2" /> Purchase Now
                </button>

                <button
                  className="btn mt-2 text-white"
                  style={{ backgroundColor: '#17a2b8' }}
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className="me-2" /> Add to Cart
                </button>

                {/* Button to navigate to the review page */}
                <button
                  className="btn mt-2 text-white"
                  style={{ backgroundColor: '#007bff' }}
                  onClick={() => handleWriteReview(product)} // Navigate to review page
                >
                  Write a Review
                </button>

                {productMessage[product.id] && (
                  <p className="mt-2" style={{ fontSize: '0.85rem' }}>
                    {productMessage[product.id]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <Chatbot />
      </div>
    </div>
  );
};

export default Getproducts;

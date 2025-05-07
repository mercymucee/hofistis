import React, { useState, useEffect } from 'react';

const Cart = () => {
  // Initialize cartItems state directly in Cart.jsx (from localStorage if available)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart (handling quantity)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        // If item already exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }
      // If item doesn't exist, add new item with quantity = 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove a product based on product ID
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Handle remove button click with confirmation
  const handleRemove = (productId) => {
    const confirmRemove = window.confirm('Are you sure you want to remove this item from your cart?');
    if (confirmRemove) {
      removeFromCart(productId);
    }
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.product_cost * item.quantity, 0);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center" style={{ color: '#28a745' }}>
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 col-lg-3 mb-4" key={item.id}>
                <div
                  className="card shadow-sm h-100"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                  }}
                >
                  <img
                    src={'https://mercymucee.pythonanywhere.com/static/images/' + item.product_photo}
                    alt={item.product_name}
                    className="card-img-top"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5>{item.product_name}</h5>
                    <p style={{ fontSize: '0.9rem' }}>{item.product_description}</p>
                    <b style={{ color: '#ffc107' }}>
                      {new Intl.NumberFormat('en-KE', {
                        style: 'currency',
                        currency: 'KES',
                      }).format(item.product_cost)}
                    </b>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mt-2">
                      <span>Quantity: {item.quantity}</span>
                    </div>

                    {/* Purchase Now Button */}
                    <button
                      className="btn mt-3 text-white"
                      style={{ backgroundColor: '#28a745' }}
                      onClick={() => alert('Proceeding to Payment')}
                    >
                      <span className="me-2">Purchase Now</span>
                    </button>

                    {/* Remove from cart button */}
                    <button
                      className="btn mt-2 btn-outline-danger"
                      onClick={() => handleRemove(item.id)} // Remove the clicked item only
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="d-flex justify-content-end mt-3">
            <h4>Total: {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(calculateSubtotal())}</h4>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;

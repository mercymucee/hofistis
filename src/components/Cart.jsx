import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {/* Fallback message if the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Add items to your cart to proceed.</p>
      ) : (
        <div>
          <ul className="list-group">
            {/* Mapping over cart items */}
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* Product image, name, and cost */}
                  <img
                    src={`https://mercymucee.pythonanywhere.com/static/images/${item.product_photo}`}
                    alt={item.product_name}
                    className="product-img"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }}
                  />
                  <span>{item.product_name} - {item.product_cost}</span>
                </div>

                {/* Remove button */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Clear Cart button */}
          <div className="mt-3">
            <button className="btn btn-warning btn-sm" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Checkout button */}
          <div className="mt-3">
            <button
              className="btn btn-success btn-sm"
              onClick={() => navigate('/mpesapayment')} // Navigate to the M-Pesa page
            >
              Proceed to Payment
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

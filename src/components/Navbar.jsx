import { Link } from "react-router-dom";
import { FaShoppingCart, FaComment } from "react-icons/fa";
import { useContext } from "react"; // Importing useContext
import { CartContext } from "./CartContext"; // Import CartContext

const Navbar = () => {
  // Access the cart data from CartContext
  const { cart } = useContext(CartContext); // Get the cart from context

  // Get the number of items in the cart
  const cartCount = cart.length;

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar bg-light navbar-light navbar-expand-md">
          <br />
          <br />
          <Link to="/" className="navbar-brand fw-bold text-primary">
            Hofistis
          </Link>
          <br />
          <br />
          <br />
          <br />
          <br />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
            aria-controls="mynavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <div className="navbar-nav">
              
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/aboutus" className="nav-link">
                About Us
              </Link>
              <Link to="/contactus" className="nav-link">
                Contact Us
              </Link>
              <Link to="/addproducts" className="nav-link">
                Upload Products
              </Link>
              {/* Add the FAQ link */}
              <Link to="/faqs" className="nav-link">
                FAQs
              </Link>
              <Link to="/review" className="nav-link">
               Review
              </Link>
              
             
            </div>
          </div>

          {/* Cart Icon with Badge */}
          <div className="navbar-nav ms-auto">
            <Link to="/cart" className="nav-link" style={{ position: "relative" }}>
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span
                  className="badge bg-danger"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    padding: "3px 7px",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

           
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;

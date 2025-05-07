import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import GetProducts from './components/GetProducts';
import MpesaPayment from './components/MpesaPayment';
import AboutUs from './components/AboutUs';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './components/Footer';
import Brands from './components/Brands';
import Login from './components/LogIn';
import Cart from './components/Cart';
import Guides from './components/Guide';
import AddProducts from './components/AddProducts';
import Faqs from './components/Faqs';
import ContactUs from './components/ContactUs';
import Review from './components/Review';
import ReturnToHofistis from './components/ReturnToHofistis';

function App() {
  // Local state to handle cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hofistis-e-commerce online</h1>
        <div className="scroll-text">
          <i>Elite performance sticks for major hockey brands for every playing style - Browse our collection</i>
        </div>
      </header>

      <Router>
        <Navbar cartItems={cartItems} />
        <ReturnToHofistis />  {/* Add the ReturnToHofistis button here */}

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/" element={<GetProducts addToCart={addToCart} />} />
          <Route path="/mpesapayment" element={<MpesaPayment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/guide" element={<Guides />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/review" element={<Review />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

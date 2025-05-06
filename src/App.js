import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
import { CartProvider } from './components/CartContext'; // Import CartProvider
import AddProducts from './components/AddPropducts';
import Faqs from './components/Faqs'; // Import Faqs component
import ContactUs from './components/ContactUs';
import Review from './components/Review';

function App() {
  return (
    <CartProvider> {/* Wrap your app with CartProvider */}
      <div className="App">
        <header className="App-header">
          <h1>Hofistis-e-commerce online</h1>
          <div className="scroll-text">
            <i>Elite performance sticks for major hockey brands for every playing style - Browse our collection</i>
          </div>
        </header>

        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/" element={<GetProducts />} />
            <Route path="/mpesapayment" element={<MpesaPayment />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/guide" element={<Guides />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactus" element={<ContactUs/>} />
            <Route path="/review" element={<Review/>} /> 
            <Route path="/faqs" element={<Faqs />} /> {/* Added Faqs route */}
          </Routes>

          <Footer />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;

import React from 'react';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import ViewOrders from './pages/ViewOrders'; 
import AdminDashboard from './pages/AdminDashboard';
import ParcelBooking from './pages/ParcelBooking';
import Tracking from './pages/Tracking';
import OrderHistory from './pages/OrderHistory';
import Services from './pages/Services';
import About from './pages/About';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/view-orders" element={<ViewOrders />} />  
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/book-parcel" element={<ParcelBooking />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}


export default App;

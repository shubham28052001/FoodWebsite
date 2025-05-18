import React from 'react'
import Footer from './components/Footer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'
import Signup from './screens/Signup.jsx'
import { ContextReducer } from './components/ContextReducer.jsx'
import MyOrders from './screens/MyOrders.jsx'

const App = () => {
  return (
    <ContextReducer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myOrder" element={<MyOrders />} />
        </Routes>
      </Router>
    </ContextReducer>
  );
}

export default App;

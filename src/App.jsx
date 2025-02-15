
import './App.css'
import Burger from './Burger'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import Auth from './Auth'
import Order from './Order'
import { useState } from 'react';
import Toolbar from './Toolbar';
import { AuthProvider } from "./AuthContext"; 
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthProvider>
    <Router>
    <div className="burgerContent">
    <Toolbar></Toolbar>
            <Routes>
              
                <Route path="/" element={<Burger />} />
                <Route path="/auth" element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />} /> 
                 <Route path="/order" element={isAuthenticated ? <Order /> : <Navigate to="/auth" />} />
            </Routes>
        
    </div>
    </Router>
    </AuthProvider>
  )
}

export default App

// src/AdminApp.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import UserManagementScreen from './screens/UserManagementScreen';

const AdminApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/admin/users" element={<UserManagementScreen />} />
    </Routes>
  </Router>
);

export default AdminApp;

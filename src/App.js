import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HelperRegistrationApp from "./HelperRegistrationApp";
import HelpersList from "./HelpersList";
import EditHelper from "./EditHelper";
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HelperRegistrationApp />} />
      <Route path="/register" element={<HelperRegistrationApp />} />
      <Route path="/helpers" element={<HelpersList />} />
      <Route path="/helpers/edit/:id" element={<EditHelper />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

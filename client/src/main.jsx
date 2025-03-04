import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'

import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Category from "./pages/Category";




const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/products" element={<Products />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/category" element={<Category/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import Users from "./pages/Users/Users";
import Cart from "./pages/Cart/Cart";

import "./App.css";

function App() {
  const [role, setRole] = useState("user");
  const [userName, setUserName] = useState("Guest");

  const handleSwitchRole = (newRole) => {
    const fakeUser = {
      name: newRole === "admin" ? "Malak (Admin)" : "Sara (User)",
      role: newRole,
    };
    sessionStorage.setItem("currentUser", JSON.stringify(fakeUser));
    setRole(newRole.toLowerCase());
    setUserName(fakeUser.name);
  };

  const handleLoginAsUser = (user) => {
    setRole(user.role.toLowerCase());
    setUserName(user.name);
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  useEffect(() => {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      const parsed = JSON.parse(user);
      setRole(parsed.role.toLowerCase());
      setUserName(parsed.name);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar role={role} userName={userName} onSwitch={handleSwitchRole} />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                role === "admin" ? <Dashboard /> : <Products role={role} />
              }
            />
            <Route path="/products" element={<Products role={role} />} />
            <Route path="/add-product" element={<AddProduct />} />

            {}
            <Route
              path="/users"
              element={<Users onLogin={handleLoginAsUser} />}
            />

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role, userName, onSwitch }) => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo">💎 Jewelry Admin Panel</div>

      {/* قسم معلومات المستخدم ومبدل الحسابات السريع */}
      <div className="user-profile">
        <p>Welcome, <strong>{userName}</strong></p>
        <div className="switch-controls">
          <button 
            onClick={() => onSwitch('admin')} 
            className={role === 'admin' ? 'active-btn' : 'inactive-btn'}
          >
            Admin
          </button>
          <button 
            onClick={() => onSwitch('user')} 
            className={role === 'user' ? 'active-btn' : 'inactive-btn'}
          >
            User
          </button>
        </div>
      </div>

    <nav>
  {/* 1. روابط الأدمن (تظهر في الأعلى دائماً للأدمن) */}
  {role === 'admin' && (
    <>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        🏠 Dashboard
      </Link>
      <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
        📦 Inventory
      </Link>
      <Link to="/add-product" className={location.pathname === '/add-product' ? 'active' : ''}>
        ➕ Add Product
      </Link>
      <Link to="/users" className={location.pathname === '/users' ? 'active' : ''}>
        👤 Users Management
      </Link>
    </>
  )}

  {/* 2. روابط اليوزر (تظهر فقط لليوزر العادي ) */}
  {role === 'user' && (
    <>
      <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
        📦 View Products
      </Link>
      <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>
        🛒 My Cart
      </Link>
    </>
  )}
</nav>
    </aside>
  );
};

export default Sidebar;
import React, { useState, useEffect } from 'react';
import './Products.css';

import photo1 from '../../assets/photo1.png';
import photo2 from '../../assets/photo2.png';
import photo3 from '../../assets/photo3.png';
import photo4 from '../../assets/photo4.png';

const Products = ({ role }) => {
  const initialData = [
    { id: 1, name: "Gold Necklace", price: 1500, countInStock: 5, img: photo1 },
    { id: 2, name: "Luxury Ring", price: 2200, countInStock: 0, img: photo2 },
    { id: 3, name: "Gold Bracelet", price: 1800, countInStock: 3, img: photo3 },
    { id: 4, name: "Elegant Earrings", price: 950, countInStock: 10, img: photo4 },
  ];

  const currentUser = sessionStorage.getItem('userName') || 'guest';
  const cartKey = `cart_${currentUser}`;

  const [productsList, setProductsList] = useState(() => {
    const saved = sessionStorage.getItem('sessionProducts');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  const [editingProduct, setEditingProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = sessionStorage.getItem(cartKey);
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, [cartKey]);

  useEffect(() => {
    sessionStorage.setItem('sessionProducts', JSON.stringify(productsList));
  }, [productsList]);

  // --- (Search & Filter) ---
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      filterStatus === "all" ? true :
      filterStatus === "available" ? p.countInStock > 0 :
      p.countInStock === 0;
    return matchesSearch && matchesStatus;
  });

  // ---  (Pagination) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const addToCart = (product) => {
    let savedCart = JSON.parse(sessionStorage.getItem(cartKey)) || [];
    const existingItemIndex = savedCart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      savedCart[existingItemIndex].quantity += 1;
    } else {
      savedCart.push({ ...product, quantity: 1 });
    }
    sessionStorage.setItem(cartKey, JSON.stringify(savedCart));
    setCartItems(savedCart);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="products-container">
      <h1>Products Collection ({role})</h1>

      {}
      <div className="controls-bar">
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
        />
        
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleUpdateProduct}>
              <h3>Update Product</h3>
              <div className="input-group-form">
                <label>Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              <div className="input-group-form">
                <label>Price</label>
                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
              </div>
              <div className="input-group-form">
                <label>Stock</label>
                <input type="number" value={editingProduct.countInStock} onChange={(e) => setEditingProduct({...editingProduct, countInStock: parseInt(e.target.value)})} />
              </div>
              <div className="modal-btns">
                <button type="submit" className="confirm-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid">
        {currentItems.map(p => {
          const isInCart = cartItems.some(item => item.id === p.id);
          return (
            <div key={p.id} className="card">
              <img src={p.img} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="price">${p.price}</p>
              <p className={`stock-status ${p.countInStock > 0 ? "available" : "not-available"}`}>
                {p.countInStock > 0 ? "Available" : "Not Available"}
              </p>
              <div className="actions">
                {role === 'admin' ? (
                  <>
                    <button className="edit" onClick={() => setEditingProduct(p)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
                  </>
                ) : (
                  <button 
                    className={`add-cart-btn ${isInCart ? 'in-cart' : ''}`}
                    disabled={p.countInStock === 0}
                    onClick={() => addToCart(p)}
                  >
                    {isInCart ? "In Cart (Add +)" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* (Pagination Buttons) */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
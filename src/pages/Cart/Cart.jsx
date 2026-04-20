import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const currentUser = sessionStorage.getItem('userName') || 'guest';
  const cartKey = `cart_${currentUser}`;
  

  useEffect(() => {
    const savedCart = sessionStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [cartKey]);

  const updateStorage = (newItems) => {
    setCartItems(newItems);
    sessionStorage.setItem(cartKey, JSON.stringify(newItems));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0); 
    
    updateStorage(updated);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-page">
      <h1>My Luxury Cart 🛒</h1>
      <p className="user-tag">User: <strong>{currentUser}</strong></p>

      {cartItems.length === 0 ? (
        <div className="empty-msg">Your cart is empty.</div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-row">
                <img src={item.img} alt={item.name} className="cart-img" />
                
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="unit-price">${item.price}</p>
                </div>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)} className="qty-btn">-</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="qty-btn">+</button>
                </div>

                <div className="cart-subtotal">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-box">
              <span>Total Amount:</span>
              <span className="total-price">${totalPrice}</span>
            </div>
            <button className="checkout-btn">Checkout Now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

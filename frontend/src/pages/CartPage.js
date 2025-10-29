import React, { useEffect, useState } from 'react';
import { fetchCart, addToCart, removeFromCart, checkout } from '../api/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], total: 0 });
    const navigate = useNavigate();
  const loadCart = () => {
    fetchCart().then(res => setCart(res.data));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId).then(() => loadCart());
  };

  const handleIncrease = (productId) => {
    addToCart(productId, 1).then(() => loadCart());
  };

  const handleDecrease = async (item) => {
    if (item.qty === 1) {
      await removeFromCart(item.product._id);
    } else {
      await addToCart(item.product._id, -1);
    }
    loadCart();
  };

  const handleCheckout = () => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    if (!name || !email) return;
    checkout({ name, email }).then(res => {
      alert('Checkout complete!');
      loadCart();
    });
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items
            .filter(it => it.product)
            .map((it) => (
              <li key={it._id} className="cart-item">
                <div className='imgandname'>
                <img className='cartimg' src={it.product.image} />
                <p className="clickable-product-name" onClick={() => navigate(`/product/${it.product._id}`)}>{it.product?.name || 'Unknown product'}</p>
                </div>
                <div className="qty-controls">
                  <button onClick={() => handleDecrease(it)}>-1</button>
                  <span>Qty: {it.qty}</span>
                  <button onClick={() => handleIncrease(it.product._id)}>+1</button>
                </div>
                <span className='cartprice'>₹{it.product.price * it.qty}</span>
                <button className='rembtn' onClick={() => handleRemove(it.product._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3 className='totalprice'>Total:&nbsp;&nbsp;&nbsp;₹&nbsp;{cart.total}</h3>
          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
}
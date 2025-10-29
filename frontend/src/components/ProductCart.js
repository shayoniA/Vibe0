import React, { useState, useEffect } from 'react';
import { addToCart } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, qty, onAdd, onIncrement, onGoToCart }) {
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(product.image);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let interval;

    if (hovering) {
      const images = [product.image, product.img1].filter(Boolean);
      let index = 0;

      interval = setInterval(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
      }, 1300);
    } else {
      setCurrentImage(product.image);
    }

    return () => clearInterval(interval);
  }, [hovering, product]);

  const handleAdd = () => {
    addToCart(product._id, 1).then(() => setInCart(true));
  };

  const handleIncrease = () => {
    addToCart(product._id, 1);
  };

  return (
    <div className="product-card">
      <div
        className="product-image"
        onClick={() => navigate(`/product/${product._id}`)}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img src={currentImage || '/placeholder.png'} alt={product.name} className='hover-slide-img' />
      </div>
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        {qty > 0 ? (
          <div className="mt-2 flex gap-2">
            <button className="flex-1 py-2 bg-green-600 text-white rounded procartbtn" onClick={onGoToCart}>Go to Cart</button>
            <button className="px-3 py-2 bg-indigo-500 text-white rounded plusone" onClick={onIncrement}>+1</button>
          </div>
        ) : (
          <button className="mt-2 py-2 bg-indigo-600 text-white rounded procartbtn" onClick={onAdd}>Add to Cart</button>
        )}
      </div>
  );
}
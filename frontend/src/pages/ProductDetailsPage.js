import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, addToCart, fetchCart } from '../api/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
    fetchCart().then((res) => setCartItems(res.data.items || []));
  }, [id]);

  const handleAdd = async () => {
    await addToCart(id, 1);
    const res = await fetchCart();
    setCartItems(res.data.items);
    alert('Added to cart!');
  };

  if (!product) return <div className="loading">Loading product...</div>;
  const qtyInCart =
    cartItems.find((item) => item.product && item.product._id === product._id)
      ?.qty || 0;

  return (
    <div className="product-details-page">
      <div className="product-details-card">
        <div className='main'>
        <img className='firstimg' src={product.image} alt={product.name} />
        <div className='main2'>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">₹{product.price}</p>
          <p className="category">Category: {product.category}</p>
          {qtyInCart > 0 ? (
            <button className="goto-cart" onClick={() => (window.location.href = '/cart')}>Go to Cart</button>
          ) : (
            <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
          )}
        </div>
        <img className='secimg' src={product.img1} alt={product.name} />
        </div>
        </div>
      </div>
    </div>
  );
}

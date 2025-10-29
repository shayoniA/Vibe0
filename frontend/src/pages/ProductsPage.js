import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCart, addToCart } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCart';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  const [filtered, setFiltered] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const categoryDisplayNames = {
    clothing: "Clothing",
    electronicsandgadgets: "Electronics and Gadgets",
    homedecor: "Home Decor",
  };

  const [categories, setCategories] = useState({
    clothing: false,
    electronicsandgadgets: false,
    homedecor: false,
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(res.data);
      setFiltered(res.data);
    });
    fetchCart().then(res => setCartItems(res.data.items));
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const validCartProducts = cartItems
        .map((item) => item.product)
        .filter((p) => p && p._id);

      if (validCartProducts.length === 0) {
        setRecommended([]);
        return;
      }

      const cartIds = validCartProducts.map((p) => p._id);
      const categoriesInCart = [
        ...new Set(validCartProducts.map((p) => p.category?.toLowerCase())),
      ];

      const avgPrice =
        validCartProducts.reduce((sum, p) => sum + (p.price || 0), 0) /
        validCartProducts.length;

      const recommendedList = products
        .filter(
          (p) =>
            !cartIds.includes(p._id) &&
            categoriesInCart.includes(p.category?.toLowerCase())
        )
        .sort(
          (a, b) =>
            Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice)
        );

      setRecommended(recommendedList);
    } else {
      setRecommended([]);
    }
  });

  useEffect(() => {
    if (showFilter) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFilter]);

  const handleFilterApply = () => {
    const selectedCategories = Object.entries(categories)
      .filter(([_, val]) => val)
      .map(([key]) => key.toLowerCase().replace(" ", ""));

    const min = Number(priceRange.min) || 0;
    const max = Number(priceRange.max) || Infinity;

    const filteredList = products.filter((p) => {
      const category = p.category?.toLowerCase().replace(" ", "");
      const inCategory =
        selectedCategories.length === 0 || selectedCategories.includes(category);
      const inPrice = p.price >= min && p.price <= max;
      return inCategory && inPrice;
    });
    setFiltered(filteredList);
    setShowFilter(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('filter-overlay')) {
      setShowFilter(false);
    }
  };

  const getQtyInCart = (productId) => {
    const item = cartItems.find(it => it.product && it.product._id === productId);
    return item ? item.qty : 0;
  };

  // Handle +1 click (increment qty)
  const handleIncrement = async (productId) => {
    await addToCart(productId, 1);
    const res = await fetchCart();
    setCartItems(res.data.items);
  };

  // Handle first add
  const handleAdd = async (productId) => {
    await addToCart(productId, 1);
    const res = await fetchCart();
    setCartItems(res.data.items);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">Products</h1>
        <button className="filter-btn" onClick={() => setShowFilter(true)}>
          🔍 Filter
        </button>
      </div>
      <div className="product-grid">
        {filtered.map(p => {
          const qty = getQtyInCart(p._id);
          return (
            <ProductCard
              key={p._id} product={p} qty={qty}
              onAdd={() => handleAdd(p._id)}
              onIncrement={() => handleIncrement(p._id)}
              onGoToCart={() => navigate('/cart')}
            />
          );
        })}
      </div>

      {recommended.length > 0 && (
        <div className="recommended-section">
          <h2>You may also like</h2>
          <div className="product-grid-ymal">
            {recommended.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onAdd={() => addToCart(p._id, 1).then(() => alert('Added'))}
              />
            ))}
          </div>
        </div>
      )}

      {showFilter && (
        <div className="filter-overlay" onClick={handleOutsideClick}>
          <div className="filter-box" onClick={(e) => e.stopPropagation()}>
            <h2 className='filterhead'>Filter Products</h2>

            <div className="filter-section">
              <h3>Categories</h3>
              {Object.keys(categories).map((cat) => (
                <label key={cat}>
                  <input type="checkbox" checked={categories[cat]} onChange={() =>
                      setCategories({ ...categories, [cat]: !categories[cat] })
                    }/>
                  {categoryDisplayNames[cat] || cat}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-inputs">
                <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}/>
                <span>–</span>
                <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}/>
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={handleFilterApply}>Apply Filter</button>
              <button className="cancel-btn" onClick={() => setShowFilter(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

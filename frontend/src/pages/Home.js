import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import api from '../api';
import './Home.css';

const BACKEND_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [stats, setStats] = useState({ products: 0, categories: 0, customers: 0 });
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    api.get('/products?limit=4')
      .then(res => setFeatured(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          setCounted(true);
          animateStats();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const animateStats = () => {
    const targetProducts = 120;
    const targetCategories = 5;
    const targetCustomers = 1800;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentProducts = 0;
    let currentCategories = 0;
    let currentCustomers = 0;
    const incrementProducts = Math.ceil(targetProducts / steps);
    const incrementCategories = Math.ceil(targetCategories / steps);
    const incrementCustomers = Math.ceil(targetCustomers / steps);

    const timer = setInterval(() => {
      currentProducts = Math.min(currentProducts + incrementProducts, targetProducts);
      currentCategories = Math.min(currentCategories + incrementCategories, targetCategories);
      currentCustomers = Math.min(currentCustomers + incrementCustomers, targetCustomers);
      setStats({
        products: currentProducts,
        categories: currentCategories,
        customers: currentCustomers,
      });
      if (
        currentProducts === targetProducts &&
        currentCategories === targetCategories &&
        currentCustomers === targetCustomers
      ) {
        clearInterval(timer);
      }
    }, interval);
  };

  const categories = [
    { name: 'Air Filter', icon: '🌬️', color: '#3b82f6' },
    { name: 'Diesel Filter', icon: '⛽', color: '#f59e0b' },
    { name: 'Fuel Filter', icon: '🛢️', color: '#ef4444' },
    { name: 'Oil Filter', icon: '🛞', color: '#10b981' },
    { name: 'Miscellaneous', icon: '🔧', color: '#8b5cf6' },
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Premium Filters</span>
            <span className="highlight">Maximum Protection</span>
          </h1>
          <p className="hero-subtitle">
            Trusted by thousands of fleet owners for TATA, Ashok Leyland &amp; HCV vehicles.
          </p>
          <div className="hero-search">
            <input type="text" placeholder="Search by P.No, Name or Cross Reference..." />
            <button>🔍 Search</button>
          </div>
          <div className="hero-badges">
            <span>✅ 100% Genuine</span>
            <span>🚚 Fast Delivery</span>
            <span>🔒 Secure Checkout</span>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            <span>🏭</span>
            <span>🔧</span>
            <span>⚙️</span>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-number">{stats.products}+</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.categories}+</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.customers}+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="home-categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <Link
              to={`/category/${cat.name}`}
              key={idx}
              className="category-card"
              style={{ '--color': cat.color }}
            >
              <div className="category-icon">{cat.icon}</div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          {featured.length === 0 ? (
            <p>Loading featured products...</p>
          ) : (
            featured.map(product => (
              <div className="featured-card" key={product._id}>
                {product.image && (
                  <img
                    src={`${BACKEND_URL}${product.image}`}
                    alt={product.productName}
                  />
                )}
                <h4>{product.pNo}</h4>
                <p>{product.productName}</p>
                <Link to={`/product/${product._id}`}>View Details →</Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"FilitGuard filters have increased our engine life by 30%. Absolutely reliable!"</p>
            <span>– Rajesh K., Fleet Manager</span>
          </div>
          <div className="testimonial-card">
            <p>"The best quality filters for Ashok Leyland trucks. Highly recommended."</p>
            <span>– Priya S., Workshop Owner</span>
          </div>
          <div className="testimonial-card">
            <p>"Quick delivery and genuine parts every time. My go-to supplier."</p>
            <span>– Amit P., Transport Business</span>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Ready to Upgrade Your Fleet?</h2>
        <p>Explore our complete range of premium filters.</p>
        <Link to="/category/Air Filter" className="cta-button">Shop Now →</Link>
      </section>
    </div>
  );
};

export default Home;
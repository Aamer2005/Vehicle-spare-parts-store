import { Link } from 'react-router-dom';
import './Home.css'; // <-- import styles

const BACKEND_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');



const Home = () => {
  const categories = ['Air Filter', 'Diesel Filter', 'Fuel Filter', 'Oil Filter', 'Miscellaneous'];

  return (
    <div className="home-container">
      <h1>WELCOME TO <span>FILITGUARD</span></h1>
      <h3>PREMIUM FILTERS FOR TATA - ASHOK LEYLAND - HCV</h3>
      <div className="category-grid">
        {categories.map(cat => (
          <Link key={cat} to={`/category/${cat}`} className="category-link">
            {cat}
          </Link>
        ))}
      </div>
            <div className="detail-image">
          {product.image && (
      <img src={`${BACKEND_URL}${product.image}`} alt={product.productName} />
        )}
        </div>
    </div>
  );
};

export default Home;
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './SearchResults.css'; // <-- import styles
import api from '../api'; // Add at top

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (q) {
      // axios.get(`http://localhost:5000/api/products?search=${q}`)
      api.get(`/products?search=${q}`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err));
    }
  }, [q]);

  return (
    <div className="search-results">
      <div className="search-header">
        <h2>
          Search Results for: <span className="query">"{q}"</span>
        </h2>
        <span className="result-count">{products.length} product(s) found</span>
      </div>

      {products.length === 0 ? (
        <div className="no-results">
          <span className="icon">🔍</span>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your search term. Try using different keywords or check the spelling.</p>
        </div>
      ) : (
        <div className="results-grid">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
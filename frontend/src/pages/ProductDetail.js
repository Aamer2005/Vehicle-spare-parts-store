import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetail.css'; // <-- import styles
import api from '../api'; // Add at top
import axios from 'axios';

const BACKEND_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

// Then in your JSX:
{product.image && (
  <img src={`${BACKEND_URL}${product.image}`} alt={product.productName} />
)}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // axios.get(`http://localhost:5000/api/products/${id}`)
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div className="loading-state">Loading...</div>;

  return (
    <div className="product-detail">
      <Link to={`/category/${product.category}`} className="back-link">
        Back to {product.category}
      </Link>

      <div className="detail-card">
        <div className="detail-image">
          {product.image && (
            <img src={`${BACKEND_URL}${product.image}`} alt={product.productName} />
          )}
        </div>

        <div className="detail-info">
          <div className="p-number">{product.pNo}</div>
          <h1>{product.productName}</h1>
          {product.type && <h2>Type: {product.type}</h2>}

          <div className="info-item">
            <span className="info-label">Category</span>
            <span className="info-value">{product.category}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Cross Reference</span>
            <span className="info-value">
              {product.crossReference?.map((ref, idx) => (
                <span key={idx} className="cross-ref">{ref}</span>
              ))}
            </span>
          </div>

          {product.description && (
            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
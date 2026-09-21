import { Link } from 'react-router-dom';
import './ProductCard.css';

// Strip '/api' from the API URL to get the backend base URL
const BACKEND_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

const ProductCard = ({ product }) => (
  <div className="product-card">
    {product.image && (
      <img
        src={`${BACKEND_URL}${product.image}`}
        alt={product.productName}
      />
    )}
    <h3>P No: {product.pNo}</h3>
    <p>{product.productName}</p>
    <p><strong>Cross Ref:</strong> {product.crossReference.join(', ')}</p>
    <Link to={`/product/${product._id}`}>View Details</Link>
  </div>
);

export default ProductCard;
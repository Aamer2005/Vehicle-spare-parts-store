import { Link } from 'react-router-dom';
import './ProductCard.css'; // <-- import styles

const ProductCard = ({ product }) => (
  <div className="product-card">
    {product.image && (
  <img src={product.image} alt={product.productName} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
)}
    <h3>P No: {product.pNo}</h3>
    <p>{product.productName}</p>
    <p><strong>Cross Ref:</strong> {product.crossReference.join(', ')}</p>
    <Link to={`/product/${product._id}`}>View Details</Link>
  </div>
);
export default ProductCard;
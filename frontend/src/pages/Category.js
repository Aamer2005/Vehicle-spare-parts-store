import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Category.css';
import api from '../api'; // Add at top


const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // axios.get(`http://localhost:5000/api/products?category=${category}`)
    api.get(`/products?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [category]);

  return (
    <div className="category-page">
      <h1>{category}</h1>
      <div className="product-grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
};
export default Category;
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css'; // <-- import the styles


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">FILITGUARD</Link>
        <span>QUALITY FILTERS, MAXIMUM PROTECTION</span>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Product Name / Cross Reference / P No."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <div className="categories">
        <Link to="/category/Air Filter">Air Filter</Link>
        <Link to="/category/Diesel Filter">Diesel Filter</Link>
        <Link to="/category/Fuel Filter">Fuel Filter</Link>
        <Link to="/category/Oil Filter">Oil Filter</Link>
        <Link to="/category/Miscellaneous">Miscellaneous</Link>
      </div>
    </nav>
  );
};
export default Navbar;
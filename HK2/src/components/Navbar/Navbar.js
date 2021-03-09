import React from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  return <div className="navbar">
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="http://www.grupohk.com.br/wp-content/uploads/2015/03/hk-logo-branco1.png" alt="logo"></img>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">Lista</Link></li>
      </ul>
    </nav>
  </div>;
}

export default NavBar;
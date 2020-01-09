import React from 'react';

const Navbar = props => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <img src="../../public/american-football.svg" alt="Football" className="football-icon" /> Texas HS <span className="blitz">Blitz</span>
      </h1>
      <ul className="nav-items">
        <li className="nav-item">All Schools</li>
        <li className="nav-item">State Championship Appearances</li>
        <input type="text" className="search" placeholder="&#x1F50D; Search for teams" />
      </ul>
    </nav>
  );
};

export default Navbar;

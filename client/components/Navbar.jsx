import React from 'react';

const Navbar = props => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <img src="../../public/american-football.svg" alt="Football" className="football-icon" /> Texas HS <span className="blitz">Blitz</span>
      </h1>
      <ul className="nav-items">
        <li className={`${props.view === 'all' ? 'current' : ''} nav-item`} onClick={() => props.changeView('all')}>
          All Teams
        </li>
        <li className={`${props.view === 'district' ? 'current' : ''} nav-item`} onClick={() => props.changeView('district')}>
          Districts
        </li>
        <li className={`${props.view === 'enroll' ? 'current' : ''} nav-item`} onClick={() => props.changeView('enroll')}>
          Enrollment
        </li>
        <li className={`${props.view === 'champions' ? 'current' : ''} nav-item`} onClick={() => props.changeView('champions')}>
          State Championship Appearances
        </li>
        <input
          type="text"
          className="search"
          placeholder="&#x1F50D; City, School, Mascot"
          value={props.searchInput}
          onChange={evt => props.handleSearchInput(evt.target.value)}
        />
      </ul>
    </nav>
  );
};

export default Navbar;

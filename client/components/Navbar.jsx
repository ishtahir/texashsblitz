import React from 'react';

const Navbar = ({ handleHamburger, hamburgerClicked, view, handleChangeView }) => {
  return (
    <nav className="navbar">
      <div className="hamburger-container" onClick={handleHamburger} style={{ top: `${hamburgerClicked ? '5%' : '15%'}` }}>
        <div className={hamburgerClicked ? 'line line1' : 'line'}></div>
        <div className={hamburgerClicked ? 'line line2' : 'line'}></div>
        <div className={hamburgerClicked ? 'line line3' : 'line'}></div>
      </div>
      <ul className="nav-items">
        <div className="logo-container">
          <h1 className="texashs">
            <img src="../../american-football.svg" alt="Football" className="football-icon" /> Texas HS <span className="blitz">Blitz</span>
          </h1>
        </div>
        <li
          className={`${view === 'classes' ? 'current' : ''} nav-item ${hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => handleChangeView('classes')}
        >
          Classes
        </li>
        <li
          className={`${view === 'districts' ? 'current' : ''} nav-item ${hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => handleChangeView('districts')}
        >
          Districts
        </li>
        <li
          className={`${view === 'enroll' ? 'current' : ''} nav-item ${hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => handleChangeView('enroll')}
        >
          Enrollment
        </li>
        <li
          className={`${view === 'appearances' ? 'current' : ''} nav-item ${hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => handleChangeView('appearances')}
        >
          State Appearances
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

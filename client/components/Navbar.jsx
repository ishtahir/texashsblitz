import React from 'react';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="hamburger-container" onClick={props.handleHamburger} style={{ top: `${props.hamburgerClicked ? '5%' : '15%'}` }}>
        <div className={props.hamburgerClicked ? 'line line1' : 'line'}></div>
        <div className={props.hamburgerClicked ? 'line line2' : 'line'}></div>
        <div className={props.hamburgerClicked ? 'line line3' : 'line'}></div>
      </div>
      <ul className="nav-items">
        <div className="logo-container">
          <h1 className="texashs">
            <img src="../../american-football.svg" alt="Football" className="football-icon" /> TXHSFB <span className="state">STATE</span>
          </h1>
        </div>
        <li
          className={`${props.view === 'classes' ? 'current' : ''} nav-item ${props.hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => props.handleChangeView('classes')}
        >
          Classes
        </li>
        <li
          className={`${props.view === 'districts' ? 'current' : ''} nav-item ${props.hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => props.handleChangeView('districts')}
        >
          Districts
        </li>
        <li
          className={`${props.view === 'enroll' ? 'current' : ''} nav-item ${props.hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => props.handleChangeView('enroll')}
        >
          Enrollment
        </li>
        <li
          className={`${props.view === 'appearances' ? 'current' : ''} nav-item ${props.hamburgerClicked ? 'block' : 'none'}`}
          onClick={() => props.handleChangeView('appearances')}
        >
          State Appearances
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

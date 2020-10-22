import React from 'react';

const Navbar = (props) => {
  return (
    <nav className='navbar'>
      <div className='hamlogo-wrap'>
        <div
          className='hamburger-container'
          onClick={props.handleHamburger}
          style={{ top: `${props.hamburgerClicked ? '5%' : '15%'}` }}
        >
          <div className={props.hamburgerClicked ? 'line line1' : 'line'}></div>
          <div className={props.hamburgerClicked ? 'line line2' : 'line'}></div>
          <div className={props.hamburgerClicked ? 'line line3' : 'line'}></div>
        </div>
        <div className='logo-container'>
          <h1 className='texashs'>
            <img
              src='../../american-football.svg'
              alt='Football'
              className='football-icon'
            />{' '}
            Texas HS <span className='blitz'>Blitz</span>
          </h1>
        </div>
      </div>
      <ul className={`nav-items ${props.hamburgerClicked ? 'block' : 'none'}`}>
        <li
          className={`${props.view === 'classes' ? 'current' : ''} nav-item`}
          onClick={() => props.handleChangeView('classes')}
        >
          Classes
        </li>
        <li
          className={`${props.view === 'districts' ? 'current' : ''} nav-item`}
          onClick={() => props.handleChangeView('districts')}
        >
          Districts
        </li>
        <li
          className={`${props.view === 'enroll' ? 'current' : ''} nav-item`}
          onClick={() => props.handleChangeView('enroll')}
        >
          Enrollment
        </li>
        <li
          className={`${
            props.view === 'appearances' ? 'current' : ''
          } nav-item`}
          onClick={() => props.handleChangeView('appearances')}
        >
          State Appearances
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

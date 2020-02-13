import React from 'react';

const Navbar = props => {
  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0 }}>
      <div className="nav-icon" onClick={evt => hamburger(evt, props)}>
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>
      <h1 className="logo">
        <img src="../../american-football.svg" alt="Football" className="football-icon" /> Texas HS <span className="blitz">Blitz</span>
      </h1>
      <ul className="nav-items">
        <li className={`${props.view === 'all' ? 'current' : ''} nav-item`} onClick={() => props.changeView('all')}>
          Classes
        </li>
        <li className={`${props.view === 'district' ? 'current' : ''} nav-item`} onClick={() => props.changeView('district')}>
          Districts
        </li>
        <li className={`${props.view === 'enroll' ? 'current' : ''} nav-item`} onClick={() => props.changeView('enroll')}>
          Enrollment
        </li>
        <li className={`${props.view === 'champions' ? 'current' : ''} nav-item`} onClick={() => props.changeView('champions')}>
          State Appearances
        </li>
      </ul>
    </nav>
  );
};

const hamburger = (evt, props) => {
  if (evt.target.className === 'nav-icon') {
    if (evt.target.querySelector('.line1').style.transform === 'translateY(12px) rotate(135deg)') {
      evt.target.querySelector('.line1').style.transform = 'translateY(0) rotate(0)';
      evt.target.querySelector('.line2').style.transform = 'translateY(0) rotate(0)';
      evt.target.querySelector('.line3').style.transform = 'translateY(0) rotate(0)';
      let navitems = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navitems.length; i++) {
        navitems[i].style.display = 'none';
      }
    } else {
      evt.target.querySelector('.line1').style.transform = 'translateY(12px) rotate(135deg)';
      evt.target.querySelector('.line2').style.transform = 'scale(0)';
      evt.target.querySelector('.line3').style.transform = 'translateY(-12px) rotate(-135deg)';
      let navitems = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navitems.length; i++) {
        navitems[i].style.display = 'block';
      }
    }
  } else {
    if (evt.target.parentNode.querySelector('.line1').style.transform === 'translateY(12px) rotate(135deg)') {
      evt.target.parentNode.querySelector('.line1').style.transform = 'translateY(0) rotate(0)';
      evt.target.parentNode.querySelector('.line2').style.transform = 'translateY(0) rotate(0)';
      evt.target.parentNode.querySelector('.line3').style.transform = 'translateY(0) rotate(0)';
      let navitems = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navitems.length; i++) {
        navitems[i].style.display = 'none';
      }
    } else {
      evt.target.parentNode.querySelector('.line1').style.transform = 'translateY(12px) rotate(135deg)';
      evt.target.parentNode.querySelector('.line2').style.transform = 'scale(0)';
      evt.target.parentNode.querySelector('.line3').style.transform = 'translateY(-12px) rotate(-135deg)';
      let navitems = document.querySelectorAll('.nav-item');
      for (let i = 0; i < navitems.length; i++) {
        navitems[i].style.display = 'block';
      }
    }
  }
  props.handleHamburger();
};

export default Navbar;

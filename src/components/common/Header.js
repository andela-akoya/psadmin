import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return(
    <nav>
      <NavLink to='/' activeClassName="active">Home</NavLink>
      {" | "}
      <NavLink to='/courses' activeClassName="active">Courses</NavLink>
      {" | "}
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
  )
};
export default Header;

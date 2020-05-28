import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => (
  <div className="d-flex">
    <NavLink
      exact
      to="/"
    >
      <img src="/logo.png" alt="" className="logo" />
    </NavLink>
  </div>
);

export default Logo;

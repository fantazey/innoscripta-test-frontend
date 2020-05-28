import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navigation = props => (
  <nav className="navigation-bar">
    <ul className="nav  d-flex flex-row justify-content-between">
      {props.categories.map((item) => (
        <li key={item.path.toString()} className="nav-item mx-3">
          <NavLink
            exact
            className="nav-link text-uppercase"
            activeClassName="active"
            to={item.path}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

Navigation.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
};

export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = props => <nav style={{'backgroundColor': 'aliceblue'}}>
  <ul className={"nav  d-flex flex-row justify-content-between"}>
    {props.categories.map((item, index) =>
      (<li key={`nav_li_${index}`} className={"nav-item mx-3"}>
        <NavLink
          exact
          key={`navigation_${index}`}
          className='nav-link text-uppercase'
          activeClassName='active'
          to={item.path}>{item.label}
        </NavLink>
      </li>)
    )}
  </ul>
</nav>;

export default Navigation;
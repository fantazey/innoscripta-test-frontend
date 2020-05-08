import React from 'react';
import {NavLink} from "react-router-dom";

const Logo = () => {
  return <div className="d-flex">
    <NavLink exact
             to="/">
      <img src="/logo.png" alt="" style={{width:'6em',height:'6em'}}/>
    </NavLink>
  </div>
};

export default Logo;

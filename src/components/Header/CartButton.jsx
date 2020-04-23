import React from "react";
import {NavLink} from "react-router-dom";

export default class CartButton extends React.Component {
  render() {
    return <div className={"mr-1 bg-warning"} style={{'borderRadius': '0.4em'}}>
      <NavLink exact
               className='nav-link'
               activeClassName='active'
               to={"/cart"}>
        <span>Cart</span>
        <span className={"pl-2"}>{this.props.cartPrice}</span>
      </NavLink>
    </div>;
  }
}
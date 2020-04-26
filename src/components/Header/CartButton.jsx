import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from 'react-i18next'
import {toCurrency} from "../../utils";

const CartButton =  props => {
  const {t} = useTranslation();
  return <div className="mr-1 bg-warning" style={{'borderRadius': '0.4em'}}>
      <NavLink exact
               className='nav-link'
               activeClassName='active'
               to="/cart">
        <span>{t('cart')}</span>
        <span className="pl-2">
          {toCurrency(props.cartPrice)}
        </span>
      </NavLink>
  </div>;
};

export default CartButton;
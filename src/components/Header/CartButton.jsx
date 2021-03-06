import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrencyPrice from '../CurrencyPrice';

const CartButton = props => {
  const { t } = useTranslation();
  return (
    <div className="d-flex">
      <div className="mr-1 bg-warning cart-button">
        <NavLink
          exact
          className="nav-link"
          activeClassName="active"
          to="/cart"
        >
          <span>{t('cart')}</span>
          <span className="pl-2">
            <CurrencyPrice price={props.cartPrice} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};

CartButton.propTypes = {
  cartPrice: PropTypes.number.isRequired
};

export default CartButton;

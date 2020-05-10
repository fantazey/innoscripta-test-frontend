import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartConfirmButton = () => {
  const { t } = useTranslation();
  return (
    <div className="row d-flex flex-row align-items-center justify-content-center">
      <div className="btn btn-warning">
        <NavLink to="/confirm">
          {t('cart-confirm')}
        </NavLink>
      </div>
    </div>
  );
};

export default CartConfirmButton;

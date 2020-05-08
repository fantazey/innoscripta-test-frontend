import React from "react";
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next'
import CurrencyPrice from "../CurrencyPrice";

const CartTotalRow = ({cartPrice}) => {
  const {t} = useTranslation();
  return <div className="row flex-row justify-content-start my-2 col-7">
    <div className="col py-2 text-right">
      <span className="pr-2">{t('cart-total')}</span><CurrencyPrice price={cartPrice} />
    </div>
  </div>
};

CartTotalRow.propTypes = {
  cartPrice: PropTypes.number
};

export default CartTotalRow;

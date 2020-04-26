import React from "react";
import {useTranslation} from 'react-i18next'
import CurrencyPrice from "../CurrencyPrice";

const TotalCartRow = props => {
  const {t} = useTranslation();
  return <div className="row flex-row justify-content-start my-2 col-7">
    <div className="col py-2 text-right">
      <span className="pr-2">{t('cart-total')}</span><CurrencyPrice price={props.cartPrice} />
    </div>
  </div>
};

export default TotalCartRow;
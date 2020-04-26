import React from "react";
import {useTranslation} from 'react-i18next';
import CurrencyPrice from "../CurrencyPrice";

const OrderRow = props => {
  const {t} = useTranslation();
  const {row} = props;
  return <div className="row flex-row justify-content-start my-2 col">
    <div className="col d-flex flex-row align-items-stretch">
      <div className="py-2">
        {row.name}
      </div>
    </div>
    <div className="col-3 d-flex flex-row align-items-stretch">
      <div className="btn btn-info disabled"
           style={{"fontWeight": "bolder"}}>
        {row.count}
      </div>
    </div>
    <div className="col-3 py-2 text-right d-flex flex-row align-items-stretch">
      <span className="pr-2">
        {t('cart-row-total')}
      </span>
      <CurrencyPrice price={row.totalPrice} />
    </div>
  </div>;
};

export default OrderRow;
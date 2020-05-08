import React from 'react';
import {useTranslation} from "react-i18next";

const CartEmpty = () => {
  const {t} = useTranslation();
  return <div className="row d-flex flex-row align-items-center justify-content-center mt-3">
    <h4>
      {t('empty-cart')}
    </h4>
  </div>
};

export default CartEmpty;

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CurrencyPrice from '../../CurrencyPrice';

const ProductCellAddButton = ({ add, price }) => {
  const { t } = useTranslation();
  return (
    <div
      className="d-flex btn btn-info align-self-stretch justify-content-start"
      onClick={add}
    >
      {t('add-to-cart')}
      <span className="px-2 align-right">
        <CurrencyPrice price={price} />
      </span>
    </div>
  );
};

ProductCellAddButton.propTypes = {
  add: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default ProductCellAddButton;

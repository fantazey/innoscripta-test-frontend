import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CurrencyPrice from '../CurrencyPrice';

const ConfirmRow = props => {
  const { t } = useTranslation(),
    { row } = props;
  return (
    <div className="row flex-row justify-content-start my-2 col">
      <div className="col d-flex flex-row align-items-stretch">
        <div className="py-2">
          {row.name}
        </div>
      </div>
      <div className="col-3 d-flex flex-row align-items-stretch">
        <div className="btn btn-info disabled fw-bolder">
          {row.count}
        </div>
      </div>
      <div className="col-3 py-2 text-right d-flex flex-row align-items-stretch">
        <span className="pr-2">
          {t('cart-row-total')}
        </span>
        <CurrencyPrice price={row.totalPrice} />
      </div>
    </div>
  );
};

ConfirmRow.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    totalPrice: PropTypes.number
  }).isRequired
};

export default ConfirmRow;

import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {toCurrency} from "../utils";

const CurrencyPrice = ({price}) => {
    const {currency, rate} = useSelector(({common}) => ({
        currency: common.currentCurrency,
        rate: common.currencyRates[common.currentCurrency]
    }));
    if (Number.isFinite(rate)) {
        return toCurrency((price * rate).toFixed(2), currency)
    }
    return null;
};

CurrencyPrice.propTypes = {
    price: PropTypes.number.isRequired
};

export default CurrencyPrice;

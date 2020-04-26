import React from 'react';
import {connect} from 'react-redux';
import {toCurrency} from "../utils";

const mapStateToProps = state => ({
    rate: state.common.currencyRates[state.common.currentCurrency],
    currency: state.common.currentCurrency
});

class CurrencyPrice extends React.Component {
    render() {
        const { price, rate, currency } = this.props;
        const currencyPrice = price * rate;
        return toCurrency(currencyPrice.toFixed(2), currency)
    }
}

export default connect(mapStateToProps, null)(CurrencyPrice);
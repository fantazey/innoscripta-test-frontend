import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {currencySymbolMap} from "../../utils";
import {COMMON_EXCHANGE_RATE_LOADED, COMMON_TOGGLE_CURRENCY} from "../../actionTypes";
import api from "../../api";

const mapStateToProps = state => ({
    currencyList: state.common.currencyList,
    currencyLoaded: state.common.currencyRates[state.common.currentCurrency],
    currentCurrency: state.common.currentCurrency
});

const mapDispatchToProps = dispatch => ({
    loadCurrency: payload => dispatch({type: COMMON_EXCHANGE_RATE_LOADED, payload}),
    toggleCurrency: currency => dispatch({type: COMMON_TOGGLE_CURRENCY, currency})
});

export class CurrencyToggler extends React.Component {
    componentDidMount() {
        const {currencyLoaded, loadCurrency, currencyList} = this.props;
        if (currencyList.length < 2) {
            return;
        }
        if (!currencyLoaded) {
            const promise = api.common.loadCurrency();
            loadCurrency(promise);
        }
    }

    render() {
        const {
            currencyList,
            currentCurrency,
            toggleCurrency
        } = this.props;
        if (currencyList.length < 2) {
            return null;
        }
        return <div className="d-flex col-1">
            {currencyList.map((currency, index) => {
                return <span className={`btn ${currency === currentCurrency ? 'btn-primary' : ''}`}
                             key={`currency_${index}`}
                             onClick={() => toggleCurrency(currency)}>
                    {currencySymbolMap[currency]}
                </span>
            })}
        </div>
    }
}

CurrencyToggler.propTypes = {
    currencyList: PropTypes.arrayOf(PropTypes.string),
    currencyLoaded: PropTypes.bool,
    currentCurrency: PropTypes.string,
    loadCurrency: PropTypes.func,
    toggleCurrency: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyToggler);

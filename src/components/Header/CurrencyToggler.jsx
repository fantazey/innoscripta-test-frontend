import React from 'react';
import {connect} from 'react-redux';
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

class CurrencyToggler extends React.Component {
    componentDidMount() {
        const {currencyLoaded, loadCurrency} = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyToggler);

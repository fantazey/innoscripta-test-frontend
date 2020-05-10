import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencySymbolMap } from '../../utils';
import {
  COMMON_EXCHANGE_RATE_LOADED,
  COMMON_TOGGLE_CURRENCY
} from '../../actionTypes';
import api from '../../api';

const mapStateToProps = state => ({
    currencyList: state.common.currencyList,
    currencyLoaded: !!state.common.currencyRates[state.common.currentCurrency],
    currentCurrency: state.common.currentCurrency
  }),

  mapDispatchToProps = dispatch => ({
    loadCurrency: payload => dispatch({ type: COMMON_EXCHANGE_RATE_LOADED, payload }),
    toggleCurrency: currency => dispatch({ type: COMMON_TOGGLE_CURRENCY, currency })
  });

class CurrencyToggler extends React.Component {
  componentDidMount() {
    const { currencyLoaded, loadCurrency } = this.props;
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
    return (
      <div className="d-flex col-1">
        {currencyList.map((currency) => (
          <span
            className={`btn ${currency === currentCurrency ? 'btn-primary' : ''}`}
            key={`currency_${currency}`}
            onClick={() => toggleCurrency(currency)}
          >
            {currencySymbolMap[currency]}
          </span>
        ))}
      </div>
    );
  }
}

CurrencyToggler.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currencyLoaded: PropTypes.bool.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  loadCurrency: PropTypes.func.isRequired,
  toggleCurrency: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyToggler);

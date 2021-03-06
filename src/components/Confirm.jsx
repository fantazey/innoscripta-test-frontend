import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ConfirmRow from './Confirm/ConfirmRow';
import OrderForm from './Confirm/ConfirmForm';
import { transformOrderProducts } from './Cart';
import Loader from './Loader';
import CurrencyPrice from './CurrencyPrice';

const mapStateToProps = state => ({
  order: state.order.order,
  cartPrice: state.order.cartPrice,
  deliveryCost: state.order.deliveryCost,
  deliveryAddressCorrect: state.order.deliveryAddressCorrect,
  orderConfirmed: state.order.orderConfirmed
});

class Confirm extends React.Component {
  componentDidUpdate(prevProps) {
    const { history, orderConfirmed } = this.props;
    if (!prevProps.orderConfirmed && orderConfirmed) {
      // todo: flash some notice that everything is ok. wait and redirect to index
      history.push('/');
    }
  }

  get items() {
    return transformOrderProducts(this.props.order.products);
  }

  get totalPrice() {
    const { cartPrice, deliveryCost } = this.props;
    return cartPrice + deliveryCost;
  }

  render() {
    const {
      order, t, deliveryCost, deliveryAddressCorrect
    } = this.props;
    if (!order) {
      return <Redirect to="/" />;
    }
    if (!order.products) {
      return <Loader />;
    }
    return (
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <h4 className="my-3">
          {t('confirm-order-title')}
        </h4>
        <div className="row col">
          <div className="col-5">
            <OrderForm />
          </div>
          <div className="col-7">
            {Object.keys(this.items).map((key) => (
              <ConfirmRow
                key={key.toString()}
                row={this.items[key]}
              />
            ))}
            <div className="row flex-row justify-content-start my-2 col">
              <div className="col py-2 text-right">
                <span className="pr-2">{t('delivery-price')}</span>
                {deliveryAddressCorrect ? <CurrencyPrice price={deliveryCost} /> : t('confirm-form-enter-correct-address')}
              </div>
            </div>
            <div className="row flex-row justify-content-start my-2 col">
              <div className="col py-2 text-right">
                <span className="pr-2">{t('cart-total')}</span>
                <CurrencyPrice price={this.totalPrice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  order: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.object
    )
  }).isRequired,
  cartPrice: PropTypes.number.isRequired,
  deliveryCost: PropTypes.number.isRequired,
  deliveryAddressCorrect: PropTypes.bool.isRequired,
  orderConfirmed: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

export default compose(
  withRouter,
  withTranslation(),
  connect(mapStateToProps, null)
)(Confirm);

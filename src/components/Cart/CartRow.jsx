import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ORDER_ADD_PRODUCT, ORDER_REMOVE_PRODUCT } from '../../actionTypes';
import api from '../../api';
import CurrencyPrice from '../CurrencyPrice';
import CartRowButton from './CartRow/CartRowButton';

const mapDispatchToProps = dispatch => ({
    addProduct: payload => dispatch({ type: ORDER_ADD_PRODUCT, payload }),
    removeProduct: payload => dispatch({ type: ORDER_REMOVE_PRODUCT, payload })
  }),

  mapStateToProps = state => ({
    uid: state.order.order.uid
  });

class CartRow extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add() {
    const { row, uid, addProduct } = this.props,
      data = {
        product: row.product.id,
        uid
      },
      promise = api.cart.addToCart(data);
    addProduct(promise);
  }

  remove() {
    const { row, uid, removeProduct } = this.props,
      data = {
        product: row.product.id,
        uid
      },
      promise = api.cart.removeFromCart(data);
    removeProduct(promise);
  }

  render() {
    const { row, t } = this.props;
    return (
      <div className="row flex-row justify-content-start my-2 col-7">
        <div className="col">
          <div className="py-2">
            {row.name}
          </div>
        </div>
        <div className="col-3 d-flex flex-row align-items-stretch">
          <CartRowButton add={this.add} extraClass="fa-plus-circle" />
          <div className="btn btn-info disabled fw-bolder">
            {row.count}
          </div>
          <CartRowButton add={this.remove} extraClass="fa-minus-circle" />
        </div>
        <div className="col-3 py-2 text-right">
          <span className="pr-2">
            {t('cart-row-total')}
          </span>
          <CurrencyPrice price={row.totalPrice} />
        </div>
      </div>
    );
  }
}

CartRow.propTypes = {
  row: PropTypes.shape({
    product: PropTypes.object,
    count: PropTypes.number,
    price: PropTypes.number,
    totalPrice: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  uid: PropTypes.string.isRequired,
  addProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartRow);

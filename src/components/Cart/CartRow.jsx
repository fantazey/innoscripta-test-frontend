import React from "react";
import {compose} from 'redux';
import {connect} from "react-redux";
import {withTranslation} from 'react-i18next';
import {ORDER_ADD_PRODUCT, ORDER_REMOVE_PRODUCT} from "../../actionTypes";
import api from "../../api";
import CurrencyPrice from "../CurrencyPrice";

const mapDispatchToProps = dispatch => ({
  addProduct: payload => dispatch({type:ORDER_ADD_PRODUCT, payload}),
  removeProduct: payload => dispatch({type: ORDER_REMOVE_PRODUCT, payload})
});

const mapStateToProps = state => ({
  uid: state.order.order.uid
});

class CartRow extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add() {
    const {row, uid, addProduct} = this.props;
    const data = {
      product: row.product.id,
      uid
    };
    const promise = api.cart.addToCart(data);
    addProduct(promise);
  }

  remove() {
    const {row, uid, removeProduct} = this.props;
    const data = {
      product: row.product.id,
      uid
    };
    const promise = api.cart.removeFromCart(data);
    removeProduct(promise);
  }

  render() {
    const {row, t} = this.props;
    return <div className="row flex-row justify-content-start my-2 col-7">
      <div className="col">
        <div className="py-2">
          {row.name}
        </div>
      </div>
      <div className="col-3 d-flex flex-row align-items-stretch">
        <span className="btn btn-success mx-2" onClick={this.add}>
          <i className="fas fa-plus-circle" />
        </span>
        <div className="btn btn-info disabled"
             style={{"fontWeight": "bolder"}}>
          {row.count}
        </div>
        <span className="btn btn-success mx-2" onClick={this.remove}>
          <i className="fas fa-minus-circle" />
        </span>
      </div>
      <div className="col-3 py-2 text-right">
        <span className="pr-2">
          {t('cart-row-total')}
        </span>
        <CurrencyPrice price={row.totalPrice} />
      </div>
    </div>
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartRow);
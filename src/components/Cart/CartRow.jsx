import React from "react";
import {compose} from 'redux';
import {connect} from "react-redux";
import {withTranslation} from 'react-i18next';
import {toCurrency} from "../../utils";
import {ORDER_ADD_PRODUCT, ORDER_REMOVE_PRODUCT} from "../../actionTypes";
import api from "../../api";

const mapDispatchToProps = dispatch => ({
  addProduct: payload => dispatch({type:ORDER_ADD_PRODUCT, payload}),
  removeProduct: payload => dispatch({type: ORDER_REMOVE_PRODUCT, payload})
});

const mapStateToProps = state => ({
  uid: state.order.order.uid
});

class CartRow extends React.Component {
  get row() {
    return this.props.row;
  }

  add(product) {
    const data = {
      product: this.row.product.id,
      uid: this.props.uid
    };
    const promise = api.cart.addToCart(data);
    this.props.addProduct(promise);
  }

  remove(product) {
    const data = {
      product: this.row.product.id,
      uid: this.props.uid
    };
    const promise = api.cart.removeFromCart(data);
    this.props.removeProduct(promise);
  }

  render() {
    return <div className={"row flex-row justify-content-start my-2 col-7"}>
      <div className={"col"}>
        <div className={"py-2"}>
          {this.row.name}
        </div>
      </div>
      <div className={"col-3 d-flex flex-row align-items-stretch"}>
        <span className={"btn btn-success mx-2"} onClick={() => this.add()}>
          <i className="fas fa-plus-circle" />
        </span>
        <div className={"btn btn-info disabled"}
             style={{"fontWeight": "bolder"}}>{this.row.count}</div>
        <span className={"btn btn-success mx-2"} onClick={() => this.remove()}>
          <i className="fas fa-minus-circle" />
        </span>
      </div>
      <div className={"col-3 py-2 text-right"}>
        <span className={"pr-2"}>{this.props.t('cart-row-total')}</span>{toCurrency(this.row.totalPrice)}
      </div>
    </div>
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartRow);
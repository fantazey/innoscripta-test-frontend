import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom'
import CartRow from "./Cart/CartRow";
import TotalCartRow from "./Cart/TotalCartRow";

const mapStateToProps = state => ({
  order: state.order.order,
  cartPrice: state.order.cartPrice,
});

export class CartRowItem {
  constructor(product) {
    this.count = 1;
    this.product = product;
  }

  get price() {
    return this.product.price;
  }

  get totalPrice() {
    return this.count * this.product.price;
  }

  get name() {
    return this.product.name;
  }

  addProduct() {
    this.count++;
  }
}

class Cart extends React.Component {

  get order() {
    return this.props.order;
  }

  get items() {
    const items = {};
    this.order.products.forEach(product => {
      if (!items.hasOwnProperty(product.id)) {
        items[product.id] = new CartRowItem(product);
      } else {
        items[product.id].addProduct();
      }
    });
    return items;
  }

  render() {
    const {t, cartPrice} = this.props;
    if (!this.order.products || this.order.products.length === 0) {
      return <div className="row d-flex flex-row align-items-center justify-content-center mt-3">
        <h4>
          {t('empty-cart')}
        </h4>
      </div>
    }
    return <React.Fragment>
      {Object.keys(this.items).map((key,index) =>
        <CartRow key={`cart_row_${index}`}
                 row={this.items[key]}
                 index={index}/>
      )}
      <TotalCartRow cartPrice={this.props.cartPrice} />
      <div className="row d-flex flex-row align-items-center justify-content-center">
        <div className="btn btn-warning">
          <NavLink to="/confirm">
          {t("cart-confirm")}
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, null)
)(Cart)
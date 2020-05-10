import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TotalCartRow from './Cart/CartTotalRow';
import CartEmpty from './Cart/CartEmpty';
import CartItemList from './Cart/CartItemList';
import CartConfirmButton from './Cart/CartConfirmButton';

class CartRowItem {
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
    this.count += 1;
  }
}

export function transformOrderProducts(products) {
  const items = {};
  products.forEach(product => {
    if (!items.hasOwnProperty(product.id)) {
      items[product.id] = new CartRowItem(product);
    } else {
      items[product.id].addProduct();
    }
  });
  return items;
}

const mapStateToProps = state => {
  const { order, cartPrice } = state.order;
  if (!order.products || order.products.length === 0) {
    return {
      isEmpty: true
    };
  }
  const items = transformOrderProducts(order.products);
  return {
    items,
    cartPrice
  };
};

/* eslint-disable-next-line one-var */
const Cart = ({ items, isEmpty, cartPrice }) => {
  if (isEmpty) {
    return <CartEmpty />;
  }
  return (
    <>
      <CartItemList items={items} />
      <TotalCartRow cartPrice={cartPrice} />
      <CartConfirmButton />
    </>
  );
};

Cart.propTypes = {
  items: PropTypes.shape(),
  cartPrice: PropTypes.number,
  isEmpty: PropTypes.bool
};

Cart.defaultProps = {
  items: {},
  cartPrice: 0,
  isEmpty: false
};

export default connect(mapStateToProps, null)(Cart);

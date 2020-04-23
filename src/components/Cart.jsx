import React from 'react';
import {connect} from 'react-redux'
import CartRow from "./Cart/CartRow";

const mapStateToProps = state => ({
  order: state.order.order
});

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
    if (!this.order.products || this.order.products.length === 0) {
      return <div>empty cart</div>
    }
    return <div>
      {Object.keys(this.items).map((key,index) =>
        <CartRow key={`cart_row_${index}`}
                 row={this.items[key]}
                 index={index}/>
      )}
    </div>
  }
}

export default connect(mapStateToProps, null)(Cart)
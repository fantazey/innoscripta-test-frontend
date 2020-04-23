import React from 'react';
import { connect } from 'react-redux';
import api from './../api';
import { v4 } from 'uuid';
import {CATEGORY_PRODUCTS_LOAD, ORDER_ADD_PRODUCT} from "../actionTypes";
import ProductCell from "./Menu/ProductCell";

const mapStateToProps = (state, props) => {
  const category = props.match.params.category;
  const menu = state.menu;
  const order = state.order.order;
  let products = [];
  if (menu.productsByCategory.hasOwnProperty(category)) {
    products = menu.productsByCategory[category];
  }
  return {
    category,
    order,
    products: products,
    productsEmpty: menu.categoryIsEmpty[category]
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, category) => dispatch({type: CATEGORY_PRODUCTS_LOAD, payload, category}),
  addToCart: (payload) => dispatch({type: ORDER_ADD_PRODUCT, payload})
});

class CategoryList extends React.Component {

  componentDidMount() {
    const {products, category, productsEmpty, onLoad} = this.props;

    if (!productsEmpty && products.length === 0) {
      const promise = api.menu.loadProducts(category);
      onLoad(promise, category);
    }
  }

  get name() {
    return this.props.category;
  }

  addToCart(product) {
    const data = {
      product: product.id
    };
    if (this.props.order.uid) {
      data.uid = this.props.order.uid;
    } else {
      data.uid = v4();
    }
    const promise = api.cart.addToCart(data);
    this.props.addToCart(promise);
  }

  render() {
    if (!this.props.products) {
      return <div>There is no products yet in this category</div>;
    }
    return <div className={"d-flex flex-column justify-content-center align-items-center"}>
      <h1>{this.name}</h1>
      <div className={"d-flex flex-row"}>
        {this.props.products.map((product, index) =>
          <ProductCell
            key={`product_cell_${index}`}
            image={"https://images.all-free-download.com/images/graphiclarge/pizza_hd_picture_5_167275.jpg"}
            name={product.name}
            description={product.description}
            add={() => this.addToCart(product)}
            price={product.price}/>
        )}
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
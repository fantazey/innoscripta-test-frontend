import React from 'react';
import { connect } from 'react-redux';
import api from './../api';
import {CATEGORY_PRODUCTS_LOAD} from "../actionTypes";
import ProductCell from "./Menu/ProductCell";

const mapStateToProps = (state, props) => {
  const category = props.match.params.category;
  const menu = state.menu;
  return {
    category,
    products: menu.productsByCategory[category],
    productsEmpty: menu.categoryIsEmpty[category]
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, category) => dispatch({type: CATEGORY_PRODUCTS_LOAD, payload, category})
});

class CategoryList extends React.Component {

  constructor(props) {
    super(...arguments);
    if (!props.products && !props.productsEmpty) {
      const promise = api.menu.loadProducts(props.category);
      props.onLoad(promise, props.category);
    }
  }

  get name() {
    return this.props.category;
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
            price={product.price}/>
        )}
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
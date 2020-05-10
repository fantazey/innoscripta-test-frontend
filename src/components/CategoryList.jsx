import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import api from '../api';
import { CATEGORY_PRODUCTS_LOAD, ORDER_ADD_PRODUCT } from '../actionTypes';
import ProductCell from './Menu/ProductCell';

const mapStateToProps = (state, props) => {
    const { category } = props.match.params,
      { menu } = state,
      { order } = state.order;
    let products = [];
    if (menu.productsByCategory.hasOwnProperty(category)) {
      products = menu.productsByCategory[category];
    }
    return {
      category,
      order,
      products,
      productsEmpty: !!menu.categoryIsEmpty[category]
    };
  },

  mapDispatchToProps = dispatch => ({
    onLoad: (payload, category) => dispatch({ type: CATEGORY_PRODUCTS_LOAD, payload, category }),
    addToCart: (payload) => dispatch({ type: ORDER_ADD_PRODUCT, payload })
  });

class CategoryList extends React.Component {
  componentDidMount() {
    this.loadProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.loadProducts();
    }
  }

  get name() {
    return this.props.category;
  }

  getContent() {
    const { products } = this.props;
    if (products.length === 0) {
      return this.emptyContent();
    }
    return (
      <div className="d-flex flex-row row justify-content-around flex-wrap">
        {products.map((product) => (
          <ProductCell
            key={product.id}
            item={product}
            add={() => this.addToCart(product)}
          />
        ))}
      </div>
    );
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

  emptyContent() {
    const { t } = this.props;
    return <div>{t('empty-category')}</div>;
  }

  loadProducts() {
    const {
      products, category, productsEmpty, onLoad
    } = this.props;
    if (!productsEmpty && products.length === 0) {
      const promise = api.menu.loadProducts(category);
      onLoad(promise, category);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>{t(this.name)}</h1>
        {this.getContent()}
      </div>
    );
  }
}

CategoryList.propTypes = {
  category: PropTypes.string.isRequired,
  order: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  productsEmpty: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(CategoryList);

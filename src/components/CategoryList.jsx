import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { v4 } from 'uuid';
import api from '../api';
import { CATEGORY_PRODUCTS_LOAD, ORDER_ADD_PRODUCT } from '../actionTypes';
import ProductCell from './Menu/ProductCell';
import { Pagination } from './Menu/Pagination';

const
  PAGINATION_LIMIT = 4,

  mapStateToProps = (state, props) => {
    const { category } = props.match.params,
      { menu } = state,
      { order } = state.order;
    let products = [],
      totalProductsCount = 0;
    if (menu.productsByCategory.hasOwnProperty(category)) {
      products = menu.productsByCategory[category];
      totalProductsCount = menu.productsByCategoryCount[category];
    }
    return {
      category,
      order,
      products,
      productsEmpty: !!menu.categoryIsEmpty[category],
      totalProductsCount
    };
  },

  mapDispatchToProps = dispatch => ({
    onLoad: (payload, category) => dispatch({ type: CATEGORY_PRODUCTS_LOAD, payload, category }),
    addToCart: (payload) => dispatch({ type: ORDER_ADD_PRODUCT, payload })
  });

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.limit = PAGINATION_LIMIT;
    this.state = {
      page: 1
    };
    this.paginationClick = this.paginationClick.bind(this);
  }

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

  get offset() {
    return (this.state.page - 1) * this.limit;
  }

  get productsForPage() {
    const { products } = this.props;
    return products.slice(this.offset, this.offset + this.limit);
  }

  getContent() {
    if (this.productsForPage.length === 0) {
      return this.emptyContent();
    }
    return (
      <div className="d-flex flex-row row justify-content-around flex-wrap">
        {this.productsForPage.map((product) => (
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
      products, productsEmpty
    } = this.props;
    if (!productsEmpty && products.length === 0) {
      this.loadProductsPage();
    }
  }

  loadProductsPage(offset = 0) {
    const {
        category, onLoad
      } = this.props,
      promise = api.menu.loadProducts(category, this.limit, offset);
    onLoad(promise, category);
  }

  paginationClick(pageNumber) {
    // needed page already loaded
    const isLoaded = this.props.products.length >= pageNumber * this.limit;
    if (!isLoaded) {
      const offset = (pageNumber - 1) * this.limit;
      this.loadProductsPage(offset);
    }
    this.setState({ page: pageNumber });
  }

  render() {
    const { t, totalProductsCount } = this.props,
      { page } = this.state,
      showPagination = totalProductsCount > this.limit;
    return (
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <h1>{t(this.name)}</h1>
        {this.getContent()}
        {showPagination ? (
          <Pagination
            count={totalProductsCount}
            onClick={this.paginationClick}
            current={page}
            perPage={this.limit}
          />
        ) : null}

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
  totalProductsCount: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(CategoryList);

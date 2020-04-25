import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {withTranslation} from 'react-i18next'
import api from '../api';
import { CATEGORIES_LOADED } from "../actionTypes";
import Navigation from "./Header/Navigation";
import CartButton from "./Header/CartButton";

const mapStateToProps = state => ({
  categoriesLoaded: state.menu.categoriesLoaded,
  categories: state.menu.categoriesByName,
  cartPrice: state.order.cartPrice,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: CATEGORIES_LOADED, payload}),
});

class Header extends React.Component {
  componentDidMount() {
    const {categoriesLoaded, onLoad} = this.props;
    if (!categoriesLoaded) {
      const promise = api.menu.loadCategories();
      onLoad(promise);
    }
  }

  getMenuButtons() {
    return this.props.categories.map(x => ({path: `/menu/${x}`, label: this.props.t(x)}));
  }

  render() {
    if (!this.props.categoriesLoaded) {
      return <div>LOADING</div>;
    }
    const categories = this.getMenuButtons();
    return <div>
      <div className={"d-flex flex-row justify-content-between align-items-center bg-light"}>
        <div className={"d-flex"}>
          <NavLink exact
            to="/">
            <img src="/logo.png" alt="" style={{width:'6em',height:'6em'}}/>
          </NavLink>
        </div>
        <div className={"d-flex text-uppercase text-center align-self-center"}
             style={{'fontSize': '3em'}}>
          {this.props.t('header-text')}
        </div>
        <div className={"d-flex"}>
          <CartButton cartPrice={this.props.cartPrice}/>
        </div>
      </div>
      <Navigation categories={categories} />
    </div>;
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
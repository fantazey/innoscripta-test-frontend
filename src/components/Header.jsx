import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import api from '../api';
import { CATEGORIES_LOADED } from "../actionTypes";
import Navigation from "./Header/Navigation";
import CartButton from "./Header/CartButton";

const mapStateToProps = state => ({
  categoriesLoaded: state.menu.categoriesLoaded,
  categories: state.menu.categoriesByName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: CATEGORIES_LOADED, payload}),
});

class Header extends React.Component {

  constructor(props) {
    super(...arguments);
    if (!props.categoriesLoaded) {
      const promise = api.menu.loadCategories();
      props.onLoad(promise);
    }
  }

  render() {
    if (!this.props.categoriesLoaded) {
      return <div>LOADING</div>;
    }
    const categories = this.props.categories.map(x => ({path: `/menu/${x}`, label: x}));
    return <div>
      <div className={"d-flex flex-row justify-content-between align-items-center bg-light"}>
        <div className={"d-flex"}>
          <img src="/logo.png" alt="" style={{width:'6em',height:'6em'}}/>
        </div>
        <div className={"d-flex text-uppercase text-center align-self-center"}
             style={{'fontSize': '3em'}}>
          Test Pizza Shop
        </div>
        <div className={"d-flex"}>
          <CartButton />
        </div>
      </div>
      <Navigation categories={categories} />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
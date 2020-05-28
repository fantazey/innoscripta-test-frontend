import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import Header from './components/Header';
import Index from './components/Index';
import CategoryList from './components/CategoryList';
import Cart from './components/Cart';
import { ORDER_CHECK } from './actionTypes';
import Confirm from './components/Confirm';
import './styles/reset.css';
import './styles/main.css';

const mapDispatchToProps = dispatch => ({
  checkOrder: payload => dispatch({ type: ORDER_CHECK, payload })
});

class App extends React.Component {
  componentDidMount() {
    this.checkExistedOrder();
  }

  checkExistedOrder() {
    const promise = api.cart.checkOrder();
    this.props.checkOrder(promise);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/menu/:category" component={CategoryList} />
          <Route path="/cart" component={Cart} />
          <Route path="/confirm" component={Confirm} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  checkOrder: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(App);

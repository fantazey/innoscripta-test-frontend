import React from 'react';
import { Switch, Route } from 'react-router-dom';
import api from './api';
import Header from './components/Header';
import Index from './components/Index';
import CategoryList from "./components/CategoryList";
import Order from "./components/Order";
import Cart from "./components/Cart";
import {ORDER_CHECK} from "./actionTypes";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => ({
  checkOrder: payload => dispatch({type: ORDER_CHECK, payload})
});

class App extends React.Component {

  checkExistedOrder() {
    const promise = api.cart.checkOrder();
    this.props.checkOrder(promise);
  }

  componentDidMount() {
    this.checkExistedOrder();
  }

  render() {
    return  <div className={"container"}>
        <Header />
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/menu/:category" component={CategoryList}/>
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
        </Switch>
        <footer style={{position: "fixed", bottom: "10px"}}>
          <a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector created by freepik - www.freepik.com</a>
        </footer>
      </div>;
  }
}

export default connect(null, mapDispatchToProps)(App);
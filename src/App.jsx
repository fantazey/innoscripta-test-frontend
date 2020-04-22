import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Index from './components/Index';
import CategoryList from "./components/CategoryList";
import Order from "./components/Order";
import Cart from "./components/Cart";

export default class App extends React.Component {
  render() {
    return  <div className={"container"}>
        <Header />
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/menu/:category" component={CategoryList}/>
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
        </Switch>
        <footer>
          <a href="https://www.freepik.com/free-photos-vectors/logo">Logo vector created by freepik - www.freepik.com</a>
        </footer>
      </div>;
  }
}
import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {withTranslation} from "react-i18next";
import {Redirect} from 'react-router-dom'
import OrderRow from "./Cart/OrderRow";
import {CartRowItem} from "./Cart";
import {toCurrency} from "../utils";
import OrderForm from "./Cart/OrderForm";

const mapStateToProps = state => ({
  order: state.order.order,
  cartPrice: state.order.cartPrice,
  deliveryCost: state.order.deliveryCost,
  deliveryAddressCorrect: state.order.deliveryAddressCorrect,
  orderConfirmed: state.order.orderConfirmed
});

class Confirm extends React.Component {
  get items() {
    const items = {};
    this.props.order.products.forEach(product => {
      if (!items.hasOwnProperty(product.id)) {
        items[product.id] = new CartRowItem(product);
      } else {
        items[product.id].addProduct();
      }
    });
    return items;
  }

  get totalPrice() {
    return +this.props.cartPrice + (+this.props.deliveryCost);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.orderConfirmed && this.props.orderConfirmed) {
      // todo: flash some notice that everything is ok. wait and redirect to index
      this.props.history.push("/");
    }
  }

  render() {
    if (!this.props.order) {
      return <Redirect to={"/"}/>
    }
    if (!this.props.order.products) {
      return <div>Loading...</div>;
    }
    const t = this.props.t;
    return <div className={"row d-flex flex-column justify-content-center align-items-center"}>
      <h4 className={"my-3"}>
        {t('confirm-order-title')}
      </h4>
      <div className={"row col"}>
        <div className={"col-6"}>
          <OrderForm/>
        </div>
        <div className={"col-6"}>
          {Object.keys(this.items).map((key,index) =>
            <OrderRow key={`order_row_${index}`}
                      row={this.items[key]}
                      index={index}/>
          )}
          <div className={"row flex-row justify-content-start my-2 col"}>
            <div className={"col py-2 text-right"}>
              <span className={"pr-2"}>{t('delivery-price')}</span>
              {this.props.deliveryAddressCorrect ? toCurrency(this.props.deliveryCost) : t('confirm-form-enter-correct-address')}
            </div>
          </div>
          <div className={"row flex-row justify-content-start my-2 col"}>
            <div className={"col py-2 text-right"}>
              <span className={"pr-2"}>{t('cart-total')}</span>{toCurrency(this.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default compose(
  withRouter,
  withTranslation(),
  connect(mapStateToProps,null)
)(Confirm);
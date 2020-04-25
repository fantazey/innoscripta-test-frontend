import React from "react";
import {compose} from "redux";
import {connect} from 'react-redux';
import {withTranslation} from "react-i18next";
import {ORDER_CHECK_ADDRESS, ORDER_CONFIRM} from "../../actionTypes";
import api from "../../api";

const mapStateToProps = state => ({
  addressCorrect: state.order.deliveryAddressCorrect,
  order: state.order.order
});

const mapDispatchToProps = dispatch => ({
  checkAddress: payload => dispatch({type: ORDER_CHECK_ADDRESS, payload}),
  confirm: payload => dispatch({type:ORDER_CONFIRM, payload})
});

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.initFields()
    };
    this.changePaymentOption = this.changePaymentOption.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  initFields() {
    const keys = [
      'name',
      'phone',
      'address',
      'paymentMethod'
    ];
    const paymentMethods = {
      cash: "0",
      card_on_line: "1"
    };
    const fields = {};
    const validation = {};
    keys.forEach(key => {
      fields[key] = '';
      validation[key] = true;
    });
    fields.paymentMethod = paymentMethods['cash'];
    return {fields, validation, paymentMethods};
  }

  changePaymentOption(event) {
    const fields = {...this.state.fields};
    fields.paymentMethod = event.target.previousSibling.value;
    this.setState({fields});
  }

  changeField(name, event) {
    const fields = {...this.state.fields};
    const value = event.target.value;
    fields[name] = value;
    this.setState({fields});
    if (name === 'address' && value.length > 5) {
      this.checkAddress(value);
    }
  }

  validateFields() {
    const phoneValidation = new RegExp(/^\d{5,}$/);
    const fields = this.state.fields;
    const validation = {...this.state.validation};
    let valid = true;

    if (fields.name.trim().length === 0) {
      validation['name'] = false;
      valid = false;
    } else {
      validation['name'] = true;
    }

    if (!phoneValidation.test(fields.phone)) {
      validation['phone'] = false;
      valid = false;
    } else {
      validation['phone'] = true;
    }

    return {validation, valid};
  }

  checkAddress(value) {
    const promise = api.cart.checkAddress(value);
    this.props.checkAddress(promise);
  }

  submitForm() {
    if (!this.props.addressCorrect) {
      return;
    }
    const {valid, validation} = this.validateFields();
    if ( !valid ) {
      this.setState({validation});
      return;
    }
    const fields = this.state.fields;
    const data = {
      clientName: fields.name,
      clientPhone: fields.phone,
      deliveryAddress: fields.address,
      paymentMethod: fields.paymentMethod,
      uid: this.props.order.uid
    };
    const promise = api.cart.confirmOrder(data);
    this.props.confirm(promise);
  }

  render() {
    const {t} = this.props;
    const {fields, paymentMethods, validation} = this.state;
    const canSubmitForm = this.props.addressCorrect;

    return <form className={""}>
      <div className={"form-group col-8"}>
        <label>Full name</label>
        <input type="text"
               className={`form-control ${validation.name ? '': 'is-invalid'}`}
               name={"name"}
               onChange={event => this.changeField('name', event)}
               value={fields.name}
               required={true}/>
      </div>
      <div className={"form-group col-8"}>
        <label>Phone</label>
        <input type="text"
               className={`form-control ${validation.phone ? '' : 'is-invalid'}`}
               name={"phone"}
               onChange={event => this.changeField('phone', event)}
               value={fields.phone}
               required={true}/>
      </div>
      <div className={"form-group col-8"}>
        <label>Delivery address</label>
        <input type="text"
               className={"form-control"}
               name={"address"}
               onChange={event => this.changeField('address', event)}
               value={fields.address}
               required={true}/>
      </div>
      <div className={"form-group col-8"}>
        <label>Payment method</label>
        {Object.keys(paymentMethods).map(key => {
          return <div className="custom-control custom-radio" key={`payment-method-control-${key}`}>
            <input
              type="radio"
              value={paymentMethods[key]}
              key={`input-payment-method-${key}`}
              checked={fields.paymentMethod === paymentMethods[key]}
              name="paymentMethod"
              onChange={()=>{}}
              className="custom-control-input" />
            <label className="custom-control-label" onClick={this.changePaymentOption}>
              {t(`payment-method-${key}`)}
            </label>
          </div>
        })}
      </div>
      <div className={"form-group col-8"}>
        <div
          onClick={this.submitForm}
          className={`btn btn-${canSubmitForm ? 'success':'secondary disabled'}`}>
          {t("form-submit")}
        </div>
      </div>
    </form>
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(OrderForm)
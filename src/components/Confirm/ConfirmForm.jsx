import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { ORDER_CHECK_ADDRESS, ORDER_CONFIRM } from '../../actionTypes';
import api from '../../api';

const mapStateToProps = state => ({
    addressCorrect: state.order.deliveryAddressCorrect,
    order: state.order.order
  }),

  mapDispatchToProps = dispatch => ({
    checkAddress: payload => dispatch({ type: ORDER_CHECK_ADDRESS, payload }),
    confirm: payload => dispatch({ type: ORDER_CONFIRM, payload })
  });

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.initFields()
    };
    this.changePaymentOption = this.changePaymentOption.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  /* eslint-disable-next-line */
  initFields() {
    const keys = [
        'name',
        'phone',
        'address',
        'paymentMethod'
      ],
      paymentMethods = {
        cash: '0',
        card_on_line: '1'
      },
      fields = {},
      validation = {};

    keys.forEach(key => {
      fields[key] = '';
      validation[key] = true;
    });
    fields.paymentMethod = paymentMethods.cash;
    return { fields, validation, paymentMethods };
  }

  changePaymentOption(event) {
    const paymentMethod = event.target.previousSibling.value;
    this.setState(state => ({
      fields: {
        ...state.fields,
        paymentMethod
      },
    }));
  }

  changeField(name, event) {
    const { value } = event.target;
    this.setState(state => {
      const fields = { ...state.fields };
      fields[name] = value;
      return { fields };
    });
    if (name === 'address' && value.length > 5) {
      this.checkAddress(value);
    }
  }

  validateFields() {
    const phoneValidation = new RegExp(/^\d{5,}$/),
      { fields } = this.state,
      validation = {};
    let valid = true;

    Object.keys(fields).forEach(key => {
      validation[key] = true;
    });

    if (fields.name.trim().length === 0) {
      validation.name = false;
      valid = false;
    }

    if (!phoneValidation.test(fields.phone)) {
      validation.phone = false;
      valid = false;
    }

    return { validation, valid };
  }

  checkAddress(value) {
    const promise = api.cart.checkAddress(value);
    this.props.checkAddress(promise);
  }

  submitForm() {
    const { addressCorrect, confirm, order } = this.props;
    if (!addressCorrect) {
      return;
    }
    const { valid, validation } = this.validateFields();
    if (!valid) {
      this.setState({ validation });
      return;
    }
    const { fields } = this.state,
      data = {
        clientName: fields.name,
        clientPhone: fields.phone,
        deliveryAddress: fields.address,
        paymentMethod: fields.paymentMethod,
        uid: order.uid
      },
      promise = api.cart.confirmOrder(data);
    confirm(promise);
  }

  render() {
    const { t, addressCorrect: canSubmitForm } = this.props,
      { fields, paymentMethods, validation } = this.state;

    return (
      <form>
        <div className="form-group col-8">
          <label htmlFor="name">{t('order-form-full-name')}</label>
          <input
            id="name"
            type="text"
            className={`form-control ${validation.name ? '' : 'is-invalid'}`}
            name="name"
            onChange={event => this.changeField('name', event)}
            value={fields.name}
            required
          />
        </div>
        <div className="form-group col-8">
          <label htmlFor="phone">{t('order-form-phone')}</label>
          <input
            id="phone"
            type="text"
            className={`form-control ${validation.phone ? '' : 'is-invalid'}`}
            name="phone"
            onChange={event => this.changeField('phone', event)}
            value={fields.phone}
            required
          />
        </div>
        <div className="form-group col-8">
          <label htmlFor="address">{t('order-form-delivery-address')}</label>
          <input
            id="address"
            type="text"
            className="form-control"
            name="address"
            onChange={event => this.changeField('address', event)}
            value={fields.address}
            required
          />
        </div>
        <div className="form-group col-8">
          <span>{t('order-form-payment-method')}</span>
          {Object.keys(paymentMethods).map(key => (
            <div className="custom-control custom-radio" key={`payment-method-control-${key}`}>
              <input
                id={`input-payment-method-${key}`}
                type="radio"
                value={paymentMethods[key]}
                key={`input-payment-method-${key}`}
                checked={fields.paymentMethod === paymentMethods[key]}
                name="paymentMethod"
                onChange={() => {}}
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                onClick={this.changePaymentOption}
              >
                {t(`payment-method-${key}`)}
              </label>
            </div>
          ))}
        </div>
        <div className="form-group col-8">
          <div
            onClick={this.submitForm}
            className={`btn btn-${canSubmitForm ? 'success' : 'secondary disabled'}`}
          >
            {t('order-form-submit')}
          </div>
        </div>
      </form>
    );
  }
}

ConfirmForm.propTypes = {
  addressCorrect: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  checkAddress: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(ConfirmForm);

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* eslint-disable quote-props */
const resources = {
  en: {
    translation: {
      'pizza': 'Pizza',
      'snack': 'Snack',
      'dessert': 'Dessert',
      'drink': 'Drink',
      'sauce': 'Sauce',
      'other': 'Other',
      'cart': 'Cart',
      'add-to-cart': 'Add',
      'header-text': 'Test pizza shop',
      'empty-category': 'There is no items yet',
      'cart-row-total': 'Sum:',
      'empty-cart': 'Cart is empty. Pleas add some pizza or anything else to proceed',
      'cart-total': 'Total:',
      'cart-confirm': 'Confirm order',
      'delivery-price': 'Delivery cost:',
      'confirm-form-enter-correct-address': 'Address required for calc delivery cost',
      'payment-method-cash': 'Cash',
      'payment-method-card_on_line': 'Credit card',
      'order-form-full-name': 'Full name',
      'order-form-phone': 'Contact phone',
      'order-form-delivery-address': 'Delivery address',
      'order-form-payment-method': 'Payment method',
      'confirm-order-title': 'Confirm order',
      'order-form-submit': 'Confirm order',
      'loading': 'Loading data'
    }
  }
};
/* eslint-enable */

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

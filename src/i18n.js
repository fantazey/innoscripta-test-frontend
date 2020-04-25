import i18n from "i18next";
import {initReactI18next} from 'react-i18next';

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
      'cart-row-total': 'Sum:'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
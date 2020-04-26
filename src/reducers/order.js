import {
  ORDER_ADD_PRODUCT,
  ORDER_CHECK, ORDER_CHECK_ADDRESS, ORDER_CONFIRM,
  ORDER_REMOVE_PRODUCT
} from "../actionTypes";

const initialState = {
  order: {},
  cartPrice: 0,
  deliveryCost: 0,
  deliveryAddressCorrect: false,
  error: null,
  orderConfirmed: false,
};

function calcCartPrice(order) {
  return order.products.reduce((acc, product) => acc + product.price, 0);
}

export default (state=initialState, action) => {
  let order;
  switch (action.type) {
    case ORDER_CHECK:
      order = {};
      let cartPrice = 0;
      if (action.payload.hasOwnProperty('order') && action.payload.order) {
        order = action.payload.order;
        cartPrice = calcCartPrice(order);
      }
      return {
        ...state,
        order,
        cartPrice
      };
    case ORDER_ADD_PRODUCT:
    case ORDER_REMOVE_PRODUCT:
      order = action.payload.order;
      return {
        ...state,
        order,
        cartPrice: calcCartPrice(order)
      };
    case ORDER_CHECK_ADDRESS:
      const payload = action.payload;
      if (payload.hasOwnProperty('deliveryCost')) {
        return {
          ...state,
          deliveryCost: payload.deliveryCost.toFixed(2),
          deliveryAddressCorrect: true
        }
      }
      return {
        ...state,
        deliveryCost: 0,
        deliveryAddressCorrect: false
      };
    case ORDER_CONFIRM:
      if (!action.payload.hasOwnProperty('order')) {
        // handle error on confirm order
        return {
          ...state
        };
      }
      order = action.payload.order;
      let orderConfirmed = false;
      if (order.status === 'confirmed') {
        orderConfirmed = true;
      }
      return {
        ...state,
        order,
        orderConfirmed,
        cartPrice: 0 // reset cart price
      };
    default:
      return {...state};
  }
}
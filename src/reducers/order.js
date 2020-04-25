import {
  ORDER_ADD_PRODUCT,
  ORDER_CHECK, ORDER_CHECK_ADDRESS, ORDER_CONFIRM,
  ORDER_REMOVE_PRODUCT
} from "../actionTypes";

const initialState = {
  order: {
    uid: '7700c7df-8f16-45f3-85ad-b6d9adb70ff3'
  },
  cartPrice: 0,
  deliveryCost: 0,
  deliveryAddressCorrect: false,
  error: null
};

function calcCartPrice(order) {
  return order.products.reduce((acc, product) => acc + product.price, 0);
}

export default (state=initialState, action) => {
  let order;
  switch (action.type) {
    case ORDER_CHECK:
      order = {};
      if (action.payload.hasOwnProperty('order') && action.payload.order) {
        order = action.payload.order;
      }
      return {
        ...state,
        order,
        cartPrice: calcCartPrice(order)
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
      return {
        ...state,
      };
    default:
      return {...state};
  }
}
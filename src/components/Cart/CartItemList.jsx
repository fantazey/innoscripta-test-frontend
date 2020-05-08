import React from 'react';
import PropTypes from 'prop-types';
import CartRow from "./CartRow";

const CartItemList = ({items}) => {
  return <React.Fragment>
    {Object.keys(items).map((key, index) =>
        <CartRow key={`cart_row_${index}`}
                 row={items[key]}/>
    )}
  </React.Fragment>
};

CartItemList.defaultProp = {
  items: {},
};

CartItemList.propTypes = {
  items: PropTypes.object
};

export default CartItemList;

import React from 'react';
import PropTypes from 'prop-types';
import CartRow from './CartRow';

const CartItemList = ({ items }) => (
  <>
    {Object.keys(items).map((key) => (
      <CartRow
        key={key.toString()}
        row={items[key]}
      />
    ))}
  </>
);

CartItemList.defaultProps = {
  items: {},
};

CartItemList.propTypes = {
  items: PropTypes.shape()
};

export default CartItemList;

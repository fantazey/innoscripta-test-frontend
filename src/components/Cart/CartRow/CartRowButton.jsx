import React from 'react';
import PropTypes from 'prop-types';

const CartRowButton = ({add, extraClass}) => {
  return <span className='btn btn-success mx-2' onClick={add}>
    <i className={['fas', extraClass].join(' ')} />
  </span>
};

CartRowButton.propTypes = {
  extraClass: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired
};

export default CartRowButton;


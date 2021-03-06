/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Image from './ProductCell/Image';
import AddButton from './ProductCell/AddButton';

const ProductCell = ({ item, add }) => (
  <div className="d-flex flex-column m-2 product-cell-wrapper">
    <Image {...item} />
    <div className="d-flex flex-column justify-content-between product-cell-name-container">
      <div className="d-flex flex-row justify-content-between">
        <span title={item.description}>
          {item.name}
        </span>
      </div>
      <AddButton price={item.price} add={add} />
    </div>
  </div>
);

ProductCell.propTypes = {
  add: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default ProductCell;

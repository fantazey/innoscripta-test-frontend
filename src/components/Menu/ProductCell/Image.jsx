import React from 'react';
import PropTypes from 'prop-types';

const ProductCellImage = ({ image, name }) => (
  <div className="d-flex">
    <img src={image} className="product-cell-image" alt={name} />
  </div>
);

ProductCellImage.defaultProps = {
  name: 'Product image',
  image: ''
};

ProductCellImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string
};

export default ProductCellImage;

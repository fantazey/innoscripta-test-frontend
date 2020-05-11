import React from 'react';
import PropTypes from 'prop-types';

const ProductCellImage = ({ image, name }) => (
  <div className="d-flex">
    <img src={image} height="150" width="150" alt={name} />
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

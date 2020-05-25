import React from 'react';
import PropTypes from 'prop-types';
import { buildPageArray } from '../../utils';

const Pagination = ({
  count, perPage, current, onClick
}) => {
  const buttons = buildPageArray(count, perPage);
  return (
    <ul className="pagination">
      {buttons.map(x => (
        <PaginationButton
          key={x}
          number={x}
          isActive={x === current}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

const PaginationButton = ({ number, isActive, onClick }) => (
  <li className={`page-item ${isActive ? 'active' : ''}`}>
    <button
      type="button"
      className="page-link"
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  </li>
);

PaginationButton.propTypes = {
  number: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

PaginationButton.defaultProps = {
  isActive: false
};

export {
  Pagination, PaginationButton
};

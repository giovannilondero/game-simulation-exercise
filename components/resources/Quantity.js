import React from 'react';
import PropTypes from 'prop-types';

const Quantity = ({ children }) => (
  <>
    <div className="resource-quantity">{children}</div>
    <style jsx>
      {`
        .resource-quantity {
          font-size: 40px;
          font-weight: bold;
          color: #454545;
        }
      `}
    </style>
  </>
);

Quantity.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Quantity;

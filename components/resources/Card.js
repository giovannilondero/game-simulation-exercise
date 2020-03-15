import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ className, children }) => (
  <div className={`resource-card ${className}`}>
    {children}
    <style jsx>
      {`
        .resource-card {
          background-color: #fff;
          display: inline-flex;
          flex: 0 1 50%;
          max-width: 300px;
          position: relative;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 1.5em 3em;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.5);
        }
      `}
    </style>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

Card.defaultProps = {
  className: '',
};

export default Card;

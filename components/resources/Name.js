import React from 'react';
import PropTypes from 'prop-types';

const Name = ({ children }) => (
  <>
    <h2>{children}</h2>
    <style jsx>
      {`
        h2 {
          font-weight: normal;
          color: #8594a3;
        }
      `}
    </style>
  </>
);

Name.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Name;

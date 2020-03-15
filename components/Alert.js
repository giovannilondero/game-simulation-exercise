import React from 'react';
import PropTypes from 'prop-types';

function getBackgroundColor(type) {
  switch (type) {
    case 'warning':
      return '#e88';
    case 'success':
      return '#8e8';
    case 'info':
    default:
      return '#88e';
  }
}

function getBorderColor(type) {
  switch (type) {
    case 'warning':
      return '#a00';
    case 'success':
      return '#0a0';
    case 'info':
    default:
      return '#00a';
  }
}

const InfoIcon = () => (
  <span role="img" aria-label="Info">
    ℹ️
  </span>
);

const WarningIcon = () => (
  <span role="img" aria-label="Warning">
    ⚠️
  </span>
);

const SuccessIcon = () => (
  <span role="img" aria-label="Alert">
    ✅
  </span>
);

const Alert = ({ type = 'info', className, children }) => {
  return (
    <>
      <div className={`alert ${className}`}>
        {type === 'success' ? <SuccessIcon /> : ''}
        {type === 'warning' ? <WarningIcon /> : ''}
        {type === 'info' ? <InfoIcon /> : ''}

        {children}
      </div>
      <style jsx>
        {`
          .alert {
            background: ${getBackgroundColor(type)};
            border: 1px solid ${getBorderColor(type)};
            padding: 8px 12px;
            border-radius: 3px;
          }
        `}
      </style>
    </>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning']),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]).isRequired,
};

Alert.defaultProps = {
  type: 'info',
  className: '',
};

export default Alert;

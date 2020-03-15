import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({ children }) => (
  <>
    <div className="resource-warning">
      <div className="warning-icon">!</div>
      <div className="warning-message">{children}</div>
    </div>
    <style jsx>
      {`
        @keyframes shadowBounce {
          0% {
            opacity: 0.4;
          }

          100% {
            opacity: 1;
          }
        }

        .resource-warning {
          position: absolute;
          right: 1em;
          top: 1em;
        }

        .warning-icon {
          font-weight: bold;
          line-height: calc(1.5em - 4px);
          position: relative;
          width: 1.5em;
          height: 1.5em;
          border: 2px solid rgba(220, 58, 58, 0.8);
          color: rgba(220, 58, 58, 1);
          border-radius: 50%;
          text-align: center;
        }

        .warning-icon::after {
          content: '';
          top: -2px;
          left: -2px;
          border: 2px solid transparent;
          position: absolute;
          width: 1.5em;
          height: 1.5em;
          opacity: 0;
          border-radius: 50%;
          box-shadow: 0px 0px 15px 3px rgba(220, 58, 58, 1);
          transition: opacity 0.3s ease-in;
          animation: shadowBounce 2s infinite 0s alternate both;
        }

        .warning-message {
          display: none;
          z-index: 1;
          border: 2px solid rgba(220, 58, 58, 1);
          background: rgb(240, 150, 150, 1);
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .warning-icon:hover + .warning-message {
          display: block;
          position: absolute;
          top: 2em;
          width: auto;
        }
      `}
    </style>
  </>
);

Warning.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Warning;

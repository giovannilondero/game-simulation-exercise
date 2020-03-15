import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src }) => (
  <>
    <div className="resource-image">
      <img src={src} alt="Resource" />
    </div>
    <style jsx>
      {`
        .resource-image {
          overflow: hidden;
          border-radius: 50%;
          display: flex;
          width: 100px;
          height: 100px;
        }

        img {
          margin: auto;
          max-width: 100%;
          max-height: 100%;
        }
      `}
    </style>
  </>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;

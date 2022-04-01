import PropTypes from 'prop-types';
import React from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function Favorites({ datatestid, alt }) {
  return (
    <img
      data-testid={ datatestid }
      src={ WhiteHeartIcon }
      alt={ alt }
    />
  );
}

Favorites.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

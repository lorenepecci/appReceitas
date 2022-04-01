import PropTypes from 'prop-types';
import React from 'react';
import ShareIcon from '../images/shareIcon.svg';

export default function Share({ datatestid, alt }) {
  return (
    <img
      data-testid={ datatestid }
      src={ ShareIcon }
      alt={ alt }
    />
  );
}

Share.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};
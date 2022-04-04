import PropTypes from 'prop-types';
import React from 'react';
import ShareIcon from '../images/shareIcon.svg';

export default function Share({ datatestid, alt, id }) {
  return (
    <div>
      <img
        id={ id }
        datatestid={ datatestid }
        src={ ShareIcon }
        alt={ alt }
      />
    </div>
  );
}

Share.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Share.defaultProps = {
  id: '',
};

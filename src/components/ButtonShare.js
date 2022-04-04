import PropTypes from 'prop-types';
import React from 'react';
import ShareIcon from '../images/shareIcon.svg';

export default function Share({ datatestid, alt, id, name }) {
  return (
    <div>
      <img
        name={ name }
        id={ id }
        data-testid={ datatestid }
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
  name: PropTypes.string,
};

Share.defaultProps = {
  id: '',
  name: '',
};

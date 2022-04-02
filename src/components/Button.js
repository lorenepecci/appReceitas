import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ datatestid, className, text, id, type }) {
  return (
    <Link to={ `/${type}/${id}/in-progress` }>
      <button
        data-testid={ datatestid }
        type="button"
        className={ className }
      >
        {text}
      </button>
    </Link>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  id: '',
  type: '',
};

import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ datatestid, className, text }) {
  return (
    <button
      data-testid={ datatestid }
      type="button"
      className={ className }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function Favorites({ datatestid, alt }) {
  const [isCopied, setIsCopied] = useState(false);
  function handleClick(state) {
    console.log(state);
    setIsCopied(state);
  }
  return (
    <button
      type="button"
      onClick={ () => { handleClick(!isCopied); } }
    >
      <img
        data-testid={ datatestid }
        src={ isCopied ? blackHeartIcon : WhiteHeartIcon }
        alt={ alt }
      />
    </button>
  );
}

Favorites.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

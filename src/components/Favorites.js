import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { verifyFavorites } from '../helpers/VerifyLocalStorage';

export default function Favorites({ datatestid, alt }) {
  const { idDetails } = useContext(Context);
  const [isCopied, setIsCopied] = useState(verifyFavorites(idDetails));
  function handleClick(state) {
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

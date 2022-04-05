import PropTypes from 'prop-types';
import React from 'react';
// import Context from '../context/Context';
// import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import { verifyFavorites } from '../helpers/VerifyLocalStorage';
// import SaveFavorites from '../helpers/SaveFavorites';
// import setLocalStorage from '../helpers/createLocalStorage';

export default function FavoriteRecipesButton({ datatestid, alt }) {
  return (
    <div>
      <img
        data-testid={ datatestid }
        src={ blackHeartIcon }
        alt={ alt }
      />
    </div>
  );
}

FavoriteRecipesButton.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

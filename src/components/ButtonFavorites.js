import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { verifyFavorites } from '../helpers/VerifyLocalStorage';
import SaveFavorites from '../helpers/SaveFavorites';
import setLocalStorage from '../helpers/createLocalStorage';

export default function Favorites({ datatestid,
  alt, foodOrDrink, idLocation, dataLocation }) {
  const { dataDetailed, setfavorite, idDetails, favorites } = useContext(Context);
  const id = idLocation || idDetails;
  const isFavorite = verifyFavorites(id);
  const [isCopied, setIsCopied] = useState(isFavorite);

  function handleClick(state) {
    const result = setIsCopied(state);
    if (!isCopied) {
      setLocalStorage('favoriteRecipes', [favorites]);
    } else {
      localStorage.removeItem('favoriteRecipes');
    }
    return result;
  }
  useEffect(() => {
    setIsCopied(isFavorite);
    const newData = dataDetailed[0] || dataLocation;
    setfavorite(SaveFavorites(newData, foodOrDrink));
  }, [dataDetailed, dataLocation, foodOrDrink, isFavorite, setfavorite]);
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
  dataLocation: PropTypes.objectOf(PropTypes.string).isRequired,
  datatestid: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  idLocation: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import setLocalStorage from '../helpers/createLocalStorage';
import getlocalStorage from '../helpers/getLocalStore';
import SaveFavorites from '../helpers/SaveFavorites';
import { verifyFavorites } from '../helpers/VerifyLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function Favorites({ alt, foodOrDrink }) {
  const { dataDetailed,
    setfavorite,
    idDetails,
    favorites,
    setList,
    FavoriteList,
  } = useContext(Context);
  const [isFavorite, setFavorite] = useState(verifyFavorites(idDetails));

  const handleClick = () => {
    const currentFavorites = getlocalStorage('favoriteRecipes');
    if (verifyFavorites(idDetails)) {
      const removeFavorite = currentFavorites.filter((item) => item.id !== idDetails);
      setLocalStorage('favoriteRecipes', removeFavorite);
      setList(removeFavorite);
      setFavorite(verifyFavorites(idDetails));
    } else if (!currentFavorites) {
      setLocalStorage('favoriteRecipes', [favorites]);
      setList([favorites]);
      setFavorite(verifyFavorites(idDetails));
    } else {
      setList((prevState) => [...prevState, favorites]);
      setFavorite(verifyFavorites(idDetails));
    }
  };
  setLocalStorage('favoriteRecipes', FavoriteList);

  useEffect(() => {
    const newData = dataDetailed[0];
    setFavorite(verifyFavorites(idDetails));
    setfavorite(SaveFavorites(newData, foodOrDrink));
  }, [FavoriteList, dataDetailed, foodOrDrink, idDetails, setfavorite]);
  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : WhiteHeartIcon }
        alt={ alt }
      />
    </button>
  );
}

Favorites.propTypes = {
  alt: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
};

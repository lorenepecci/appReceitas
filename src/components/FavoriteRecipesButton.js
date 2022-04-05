import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { verifyFavorites } from '../helpers/VerifyLocalStorage';
import setLocalStorage from '../helpers/createLocalStorage';
import Context from '../context/Context';
import getlocalStorage from '../helpers/getLocalStore';

export default function FavoriteRecipesButton({ datatestid, alt, id, obj }) {
  const { FavoriteList, setList } = useContext(Context);
  const [isFavorite, setFavorite] = useState(verifyFavorites(id));
  const handleClick = () => {
    const currentFavorites = getlocalStorage('favoriteRecipes');
    if (verifyFavorites(id)) {
      const removeFavorite = currentFavorites.filter((item) => item.id !== id);
      setLocalStorage('favoriteRecipes', removeFavorite);
      setList(removeFavorite);
      console.log('true');
    } else {
      console.log('false');
      setList((prevState) => [...prevState, obj]);
    }
  };
  setLocalStorage('favoriteRecipes', FavoriteList);

  useEffect(() => setFavorite(verifyFavorites(id)));

  return (
    <div>
      <button type="button" onClick={ handleClick }>
        <img
          data-testid={ datatestid }
          src={ isFavorite ? blackHeartIcon : WhiteHeartIcon }
          alt={ alt }
        />
      </button>
    </div>
  );
}

FavoriteRecipesButton.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  obj: PropTypes.objectOf(PropTypes.string).isRequired,
};

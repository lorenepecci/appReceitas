import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import SaveFavorites from '../helpers/SaveFavorites';
import Context from '../context/Context';

export default function Favorites({ datatestid, alt, foodOrDrink }) {
  const { dataDetailed, setfavorite } = useContext(Context);
  useEffect(() => {
    const newData = dataDetailed[0];
    const test = SaveFavorites(newData, foodOrDrink);
    setfavorite(test);
  }, [dataDetailed, foodOrDrink, setfavorite]);
  return (
    <button type="button" data-testid="favorite-btn">
      <img
        datatestid={ datatestid }
        src={ WhiteHeartIcon }
        alt={ alt }
      />
    </button>
  );
}

Favorites.propTypes = {
  alt: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
};

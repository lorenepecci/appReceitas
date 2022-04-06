import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function CardIngredients({ index, name, isFood }) {
  const history = useHistory();
  const imgFood = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  const imgDrink = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  const urlRecipes = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  const urlRecipesDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;

  const { setUrlForFetch } = useContext(Context);
  const { setIsFromIngredientsExplore } = useContext(Context);

  const img = () => {
    if (isFood) {
      return imgFood;
    }
    return imgDrink;
  };

  const onHandleClick = () => {
    setIsFromIngredientsExplore(true);
    if (isFood) {
      setUrlForFetch(urlRecipes);
      history.push('/foods');
    } else {
      setUrlForFetch(urlRecipesDrinks);
      history.push('/drinks');
    }
  };
  return (
    <div>
      <h1 data-testid={ `${index}-card-name` }>{ name }</h1>
      <button
        type="button"
        data-testid={ `${index}-ingredient-card` }
        onClick={ onHandleClick }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ img() }
          alt="cardIngredient"
          width="50px"
        />
      </button>
    </div>
  );
}

CardIngredients.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isFood: PropTypes.bool.isRequired,
};

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function CardIngredients({ index, name }) {
  const history = useHistory();
  const img = `https://www.themealdb.com/images/ingredients/${name}.png`;
  const urlRecipes = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  const { setFoodCards } = useContext(Context);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(urlRecipes);
      const data = await response.json();
      setFoodCards(data.meals);
    } catch (error) {
      return error;
    }
  };

  const onHandleClick = () => {
    console.log('loreneeeeeee');
    fetchRecipes();
    history.push('/foods');
  };
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <h1 data-testid={ `${index}-card-name` }>{ name }</h1>
      <button
        type="button"
        onClick={ onHandleClick }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="drink"
          width="50px"
        />
      </button>
    </div>
  );
}

CardIngredients.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

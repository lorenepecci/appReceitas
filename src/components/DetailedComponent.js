import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Favorites from './Favorites';
import Share from './Share';

function DetailedComponent({ foodOrDrink }) {
  const {
    dataDetailed,
    listOfIngredients,
    setListOfIngredients,
  } = useContext(Context);

  const newData = dataDetailed[0];

  const removeEmptyFilter = (obj) => Object
    .fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== ''));

  useEffect(() => {
    const strIngredient = 'strIngredient';
    const filteredIng = Object.keys(newData).filter((key) => key.match(strIngredient))
      .reduce((obj, key) => {
        obj[key] = newData[key];
        // return obj;
        return removeEmptyFilter(obj);
      }, {});
    const strMeasure = 'strMeasure';
    const filteredMeasure = Object.keys(newData).filter((key) => key.match(strMeasure))
      .reduce((obj, key) => {
        obj[key] = newData[key];
        return removeEmptyFilter(obj);
      }, {});
    setListOfIngredients({
      ingredients: filteredIng,
      measure: filteredMeasure,
    });
  }, [newData, setListOfIngredients]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ newData.strMealThumb || newData.strDrinkThumb }
        alt="Imagem da receita pronta"
        width="200px"
      />
      <div>
        <h2 data-testid="recipe-title">
          { newData.strMeal || newData.strDrink }
        </h2>
        <button type="button">
          <Favorites
            data-testid="share-btn"
            alt="Icone de compartilhamento"
          />
        </button>
        <button type="button">
          <Share
            data-testid="favorite-btn"
            alt="Icone de favoritar"
          />
        </button>
      </div>
      <p data-testid="recipe-category">
        { foodOrDrink === 'foods' ? newData.strCategory : newData.strAlcoholic }
      </p>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {Object.values(listOfIngredients.ingredients).map((value, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${value} - ${Object.values(listOfIngredients.measure)[index]}`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          { newData.strInstructions }
        </p>
      </div>
    </div>
  );
}

DetailedComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

export default DetailedComponent;

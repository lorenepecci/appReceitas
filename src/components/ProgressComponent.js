import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

const copy = require('clipboard-copy');

function ProgressComponent({ foodOrDrink }) {
  const {
    dataDetailed,
    listOfIngredients,
    setListOfIngredients,
  } = useContext(Context);

  const [isLinkCopied, setIsLinkCopied] = useState(false);

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

  const handleClick = () => {
    copy(window.location.href);
    setIsLinkCopied(true);
  };

  const lengthOfObject = Object.keys(listOfIngredients.ingredients).length;

  const [checkedState, setCheckedState] = useState(
    new Array(lengthOfObject).fill(false),
  );

  console.log('ing', lengthOfObject);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState
      .map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
  };

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
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleClick }
        >
          <Share
            datatestid="share-btn"
            alt="Icone de compartilhamento"
          />
        </button>
        <button type="button" data-testid="favorite-btn">
          <Favorites
            datatestid="favorite-btn"
            alt="Icone de favoritar"
            foodOrDrink={ foodOrDrink }
          />
        </button>
      </div>
      {isLinkCopied ? <p>Link copied!</p> : null}
      <p data-testid="recipe-category">
        { foodOrDrink === 'foods' ? newData.strCategory : newData.strAlcoholic }
      </p>
      <div>
        <h3>Ingredients</h3>
        <div>
          <ul>
            {Object.values(listOfIngredients.ingredients).map((value, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-step` }>
                <div>
                  <input
                    type="checkbox"
                    id={ index }
                    checked={ checkedState[index] }
                    onChange={ () => handleOnChange(index) }
                  />
                  <label htmlFor={ value }>
                    {`${value} - ${Object.values(listOfIngredients.measure)[index]}`}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
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

ProgressComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

export default ProgressComponent;

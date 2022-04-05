/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

const copy = require('clipboard-copy');

function DetailedComponent({ foodOrDrink }) {
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
  }, [foodOrDrink, newData]);

  const handleClick = () => {
    copy(window.location.href);
    setIsLinkCopied(true);
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
            datatestid="img-share-btn"
            alt="Icone de compartilhamento"
          />
        </button>
        <Favorites
          alt="Icone de favoritar"
          foodOrDrink={ foodOrDrink }
        />
      </div>
      {isLinkCopied ? <p>Link copied!</p> : null}
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

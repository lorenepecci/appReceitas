import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkedState, setCheckedState] = useState([]);

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
    const lengthOfObject = Object.keys(filteredIng).length;
    setCheckedState(new Array(lengthOfObject).fill(false));
  }, [newData, setListOfIngredients, setCheckedState]);

  const handleClick = ({ target }) => {
    copy(`http://localhost:3000/${foodOrDrink}/${target.id}`);
    setIsLinkCopied(true);
  };

  /*   const lengthOfObject = Object.keys(listOfIngredients.ingredients).length;

  const [checkedState, setCheckedState] = useState(
    new Array(lengthOfObject).fill(false),
  );
 */
  const checkButton = (updatedCheckedState) => {
    const check = updatedCheckedState.every((value) => (value === true));
    setIsDisabled(!check);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState
      .map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    checkButton(updatedCheckedState);
  };

  console.log(checkedState, isDisabled);

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
            id={ newData.idMeal || newData.idDrink }
            datatestid="share-btn"
            alt="Icone de compartilhamento"
          />
        </button>
        <Favorites
          idLocation={ newData.idMeal || newData.idDrink }
          datatestid="favorite-btn"
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
      <div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
          disabled={ isDisabled }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

ProgressComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

export default ProgressComponent;

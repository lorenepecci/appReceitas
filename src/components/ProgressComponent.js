import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import setLocalStorage from '../helpers/createLocalStorage';
import getlocalStorage from '../helpers/getLocalStore';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

const copy = require('clipboard-copy');

function ProgressComponent({ id, foodOrDrink }) {
  const {
    dataDetailed,
    listOfIngredients,
    setListOfIngredients,
  } = useContext(Context);

  const history = useHistory();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkedState, setCheckedState] = useState([]);
  const [ingredientsChecked, setingredientsChecked] = useState([]);

  const newData = dataDetailed[0];

  const removeEmptyFilter = (obj) => Object
    .fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== ''));

  useEffect(() => {
    const strIngredient = 'strIngredient';
    const filteredIng = Object.keys(newData).filter((key) => key.match(strIngredient))
      .reduce((obj, key) => {
        obj[key] = newData[key];
        return removeEmptyFilter(obj);
      }, {});
    console.log(filteredIng);
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

  const checkButton = (updatedCheckedState) => {
    const check = updatedCheckedState.every((value) => (value === true));
    setIsDisabled(!check);
  };

  useEffect(() => {
    const getInProgessRecipes = getlocalStorage('inProgressRecipes');
    const mealsPrev = getInProgessRecipes
      ? getInProgessRecipes.meals : {};
    const cocktailsPrev = getInProgessRecipes
      ? getInProgessRecipes.cocktails : {};
    let newObj = {};
    if (foodOrDrink === 'foods') {
      const mealsNew = {
        [id]: ingredientsChecked,
      };
      newObj = {
        meals: { ...mealsPrev, ...mealsNew },
        cocktails: { ...cocktailsPrev },
      };
    }
    if (foodOrDrink === 'drinks') {
      const drinksNew = {
        [id]: ingredientsChecked,
      };
      newObj = {
        meals: { ...mealsPrev },
        cocktails: { ...cocktailsPrev, ...drinksNew },
      };
    }
    setLocalStorage('inProgressRecipes', newObj);
  }, [ingredientsChecked]);

  const handleOnChange = (position) => {
    const ingr = Object.values(listOfIngredients.ingredients)[position];
    setingredientsChecked((prev) => prev.concat(ingr));
    const updatedCheckedState = checkedState
      .map((item, index) => (index === position ? !item : item));
    console.log(checkedState);
    setCheckedState(updatedCheckedState);
    checkButton(updatedCheckedState);
  };

  useEffect(() => {
    const getRecipes = getlocalStorage('doneRecipes');
    if (!getRecipes) {
      setLocalStorage('doneRecipes', []);
    }

    const getInProgessRecipes = getlocalStorage('inProgressRecipes');
    if (!getInProgessRecipes) {
      setLocalStorage('inProgressRecipes', {
        meals: {},
        cocktails: {},
      });
    }
  }, []);

  const pushDoneRecipes = () => {
    let newObjDone = {};
    console.log(foodOrDrink);
    if (foodOrDrink === 'drinks') {
      newObjDone = ({
        id: dataDetailed[0].idDrink,
        type: 'drink',
        category: dataDetailed[0].strCategory,
        alcoholicOrNot: dataDetailed[0].strAlcoholic,
        name: dataDetailed[0].strDrink,
        image: dataDetailed[0].strDrinkThumb,
        doneDate: '23/06/2020',
        tags: null,
      });
    } else {
      newObjDone = ({
        id: dataDetailed[0].idMeal,
        type: 'food',
        nationality: dataDetailed[0].strArea,
        category: dataDetailed[0].strCategory,
        alcoholicOrNot: '',
        name: dataDetailed[0].strMeal,
        image: dataDetailed[0].strMealThumb,
        doneDate: '23/06/2020',
        tags: null,
      });
    }
    const getRecipes = getlocalStorage('doneRecipes');
    const newList = [...getRecipes, newObjDone];
    setLocalStorage('doneRecipes', newList);
    history.push('/done-recipes');
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
            id={ newData.idMeal || newData.idDrink }
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
          onClick={ pushDoneRecipes }
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
  id: PropTypes.string.isRequired,
};

export default ProgressComponent;

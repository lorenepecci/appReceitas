import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import setLocalStorage from '../helpers/createLocalStorage';
import getlocalStorage from '../helpers/getLocalStore';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';
import './inprogress.css';

const copy = require('clipboard-copy');

function ProgressComponent({ id, foodOrDrink, data }) {
  console.log(data, 'resultado');
  const {
    dataDetailed,
    listOfIngredients,
    setListOfIngredients,
  } = useContext(Context);
  const newData = data[0];
  const strIngredient = 'strIngredient';
  const history = useHistory();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [checkedState, setCheckedState] = useState([]);
  let getInProgessRecipes;
  const [isId, setIsId] = useState(false);
  const resposta = () => {
    if (foodOrDrink === 'drinks') return getInProgessRecipes.cocktails[`${id}`];
    return getInProgessRecipes.meals[`${id}`];
  };

  const [ingredientsChecked, setingredientsChecked] = useState(isId ? resposta() : []);
  console.log(ingredientsChecked);
  const removeEmptyFilter = (obj) => Object
    .fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== ''));
  useEffect(() => {
    const filteredIng = Object.keys(newData).filter((key) => key.match(strIngredient))
      .reduce((obj, key) => {
        obj[key] = newData[key];
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
  const checkButton = (updatedCheckedState) => {
    const check = updatedCheckedState.every((value) => (value === true));
    setIsDisabled(!check);
  };
  useEffect(() => {
    const mealsPrev = getInProgessRecipes
      ? getInProgessRecipes.meals : {};
    const cocktailsPrev = getInProgessRecipes
      ? getInProgessRecipes.cocktails : {};
    let newObj = {};
    if (foodOrDrink === 'foods') {
      const mealsNew = { [id]: ingredientsChecked };
      newObj = {
        meals: { ...mealsPrev, ...mealsNew },
        cocktails: { ...cocktailsPrev },
      };
    }
    if (foodOrDrink === 'drinks') {
      const drinksNew = { [id]: ingredientsChecked };
      newObj = {
        meals: { ...mealsPrev },
        cocktails: { ...cocktailsPrev, ...drinksNew },
      };
    }
    setLocalStorage('inProgressRecipes', newObj);
  }, [ingredientsChecked]);
  useEffect(() => {
    const getRecipes = getlocalStorage('doneRecipes');
    if (!getRecipes) {
      setLocalStorage('doneRecipes', []);
    }
    getInProgessRecipes = getlocalStorage('inProgressRecipes');
    if (!getInProgessRecipes) {
      setLocalStorage('inProgressRecipes', {
        meals: {},
        cocktails: {},
      });
      getInProgessRecipes = getlocalStorage('inProgressRecipes');
    } else {
      setIsId(Object.keys(getInProgessRecipes.meals).some((key) => key === id)
      || Object.keys(getInProgessRecipes.cocktails).some((key) => key === id));
    }
  }, []);

  useEffect(() => {
    const filteredIng = Object.keys(newData).filter((key) => key.match(strIngredient))
      .reduce((obj, key) => {
        obj[key] = newData[key];
        return removeEmptyFilter(obj);
      }, {});
    setCheckedState([]);
    const lengthOfObject = Object.keys(filteredIng).length;
    for (let i = 0; i < lengthOfObject; i += 1) {
      const ingr = Object.values(listOfIngredients.ingredients);
      const findIng = ingredientsChecked.find((item) => item === ingr[i]);
      if (findIng) {
        setCheckedState((prev) => [...prev, true]);
      } else {
        setCheckedState((prev) => [...prev, false]);
      }
    }
  }, [listOfIngredients, newData]);

  const pushDoneRecipes = () => {
    let newObjDone = {};
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
  const handleOnChange = (position) => {
    const ingr = Object.values(listOfIngredients.ingredients)[position];
    const updatedCheckedState = checkedState
      .map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    if (updatedCheckedState[position] === true) {
      setingredientsChecked((prev) => prev.concat(ingr));
    } else {
      setingredientsChecked((prev) => prev.filter((i) => i !== ingr));
    }
    checkButton(updatedCheckedState);
  };

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ foodOrDrink === 'foods' ? newData.strMealThumb
            : newData.strDrinkThumb }
          alt="Imagem da receita pronta"
          width="200px"
        />

        <h2 data-testid="recipe-title">
          { foodOrDrink === 'foods' ? newData.strMeal : newData.strDrink }
        </h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleClick }
        >

          <Share
            id={ foodOrDrink === 'foods' ? newData.idMeal : newData.idDrink }
            alt="Icone de compartilhamento"
          />
        </button>
        <Favorites
          alt="Icone de favoritar"
          foodOrDrink={ foodOrDrink }
          id={ id }
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
                  <label
                    className="riscar"
                    htmlFor={ value }
                  >
                    <input
                      type="checkbox"
                      id={ index }
                      checked={ checkedState[index] }
                      onChange={ () => handleOnChange(index) }
                    />
                    <span
                      className="tagp"
                    >
                      { `${value} - ${Object.values(listOfIngredients.measure)[index]}` }
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3>Instructions</h3>
      <p data-testid="instructions">
        { newData.strInstructions }
      </p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ pushDoneRecipes }
        disabled={ isDisabled }
      >
        Finish Recipe
      </button>
    </div>
  );
}
ProgressComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ProgressComponent;

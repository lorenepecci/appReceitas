import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import setLocalStorage from '../helpers/createLocalStorage';
import getlocalStorage from '../helpers/getLocalStore';
import './inprogress.css';
import ProgressCard from './ProgressCard';

function ProgressComponent({ id, foodOrDrink, checkButton }) {
  const {
    listOfIngredients,
  } = useContext(Context);
  const [checkedState, setCheckedState] = useState(
    new Array(Object.keys(listOfIngredients.ingredients).length)
      .fill(false),
  );
  const [getInProgessRecipes, setGetInProgressRecipes] = useState(
    () => getlocalStorage('inProgressRecipes'),
  );
  const [ingredientsChecked, setingredientsChecked] = useState([]);

  useEffect(() => {
    const getRecipes = getlocalStorage('doneRecipes');
    if (!getRecipes) {
      setLocalStorage('doneRecipes', []);
    }
    if (!getInProgessRecipes) {
      setGetInProgressRecipes({
        meals: {},
        cocktails: {},
      });
      setLocalStorage('inProgressRecipes', {
        meals: {},
        cocktails: {},
      });
    }
  }, []);

  useEffect(() => {
    if (getInProgessRecipes) {
      let listOfLocalStorage = [];
      setCheckedState([]);
      if (Object.keys(getInProgessRecipes.meals).some((key) => key === id)) {
        listOfLocalStorage = getInProgessRecipes.meals[`${id}`];
      } else if (Object.keys(getInProgessRecipes.cocktails).some((key) => key === id)) {
        listOfLocalStorage = getInProgessRecipes.cocktails[`${id}`];
      }
      setingredientsChecked(listOfLocalStorage);
      const lengthOfObject = Object.keys(listOfIngredients.ingredients).length;
      for (let i = 0; i < lengthOfObject; i += 1) {
        const ingredients = Object.values(listOfIngredients.ingredients);
        const findIng = listOfLocalStorage.find((item) => item === ingredients[i]);
        if (findIng) {
          setCheckedState((prev) => [...prev, true]);
        } else {
          setCheckedState((prev) => [...prev, false]);
        }
      }
    }
  }, [listOfIngredients]);

  useEffect(() => {
    if (ingredientsChecked.length) {
      const mealsPrev = getInProgessRecipes.meals;
      const cocktailsPrev = getInProgessRecipes.cocktails;
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
    } else if (getInProgessRecipes) {
      const mealsPrev = getInProgessRecipes.meals;
      const cocktailsPrev = getInProgessRecipes.cocktails;
      let newObj = {};
      if (foodOrDrink === 'drinks') {
        const novo = Object.keys(cocktailsPrev)
          .filter((key) => key !== id)
          .reduce((cur, key) => Object.assign(cur, { [key]: cocktailsPrev[key] }), {});
        newObj = {
          meals: { ...mealsPrev },
          cocktails: { ...novo },
        };
      } else {
        const novo = Object.keys(mealsPrev)
          .filter((key) => key !== id)
          .reduce((cur, key) => Object.assign(cur, { [key]: mealsPrev[key] }), {});
        newObj = {
          meals: { ...novo },
          cocktails: { ...cocktailsPrev },
        };
      }
      setLocalStorage('inProgressRecipes', newObj);
    }
  }, [ingredientsChecked]);

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
      <h3>Ingredients</h3>
      <div>
        <ul>
          {Object.values(listOfIngredients.ingredients).map((value, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-step` }>
              <ProgressCard
                checkedState={ checkedState[index] }
                index={ index }
                measure={ listOfIngredients.measure }
                value={ value }
                handleOnChange={ handleOnChange }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
ProgressComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checkButton: PropTypes.func.isRequired,
};
export default ProgressComponent;

import { useContext } from 'react';
import Context from '../context/Context';

function SetProgressInLStorage(type, id, ing) {
  const {
    mealsList,
    setMealsList,
    cocktailsList,
    setCocktailsList,
  } = useContext(Context);

  let inProgressRecipes = {
    meals: {},
    cocktails: {},
  };
  if (type === 'foods') {
    setMealsList(...mealsList, ing);
    inProgressRecipes = {
      meals: {
        [id]: mealsList,
      },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  } if (type === 'drinks') {
    setCocktailsList(...cocktailsList, ing);
    inProgressRecipes = {
      cocktails: {
        [id]: [ing],
      },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
}

export default SetProgressInLStorage;

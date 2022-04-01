import getlocalStorage from './getLocalStore';

export const DoneRecipesStore = (id) => {
  const doneRecipes = getlocalStorage('doneRecipes');
  return doneRecipes
    ? doneRecipes.some((item) => item.id === id) : false;
};

export const InProgressRecipesStore = (type, id) => {
  let results;
  if (type === 'drinks') {
    const inProgressMeals = getlocalStorage('inProgressRecipes');
    const { cocktails } = inProgressMeals;
    results = Object.prototype.hasOwnProperty.call(cocktails, id);
  } else if (type === 'foods') {
    const inProgressMeals = getlocalStorage('inProgressRecipes');
    const { meals } = inProgressMeals;
    results = Object.prototype.hasOwnProperty.call(meals, id);
  }
  return results;
};

// Referencia para frunção InProgressRecipesStore: https://eslint.org/docs/rules/no-prototype-builtins

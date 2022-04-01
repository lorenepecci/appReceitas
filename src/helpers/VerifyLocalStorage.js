// import getlocalStorage from './getLocalStore';

// export const DoneRecipesStore = (id) => {
//   const doneRecipes = getlocalStorage('doneRecipes');
//   return doneRecipes.some((item) => item.id === id);
// };

// export const InProgressRecipesStore = (page, id) => {
//   let results;
//   if (page === 'drinks') {
//     const inProgressDrinks = getlocalStorage('inProgressRecipes')
//       .map((item) => item.cocktails.id);
//     for (let i = 0; i <= inProgressDrinks.length; i += 1) {
//       results = inProgressDrinks.some((item) => item[i] === id);
//     }
//   } else if (page === 'foods') {
//     const inProgressMeals = getlocalStorage('inProgressRecipes')
//       .map((item) => item.meals.id);
//     for (let i = 0; i <= inProgressMeals.length; i += 1) {
//       results = inProgressMeals.some((item) => item[i] === id);
//     }
//   }
//   return results;
// };

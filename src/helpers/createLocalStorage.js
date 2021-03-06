export default function setLocalStorage(key, item) {
  return localStorage.setItem(`${key}`, JSON.stringify(item));
}

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'food',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

// export function MockStorage() {
//   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
// }
// const inProgressRecipes = {
//   meals: {
//     52771: [],
//     52772: [],
//   },
//   cocktails: {
//     178319: [],
//     178320: [],
//   },
// };

// export function mockStore() {
//   localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
// }

// mockStore();

// const favoriteRecipes = [
//   {
//     id: '52771',
//     type: 'food',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//   },
// ];

// function MockStorage() {
//   localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
// }

// MockStorage();

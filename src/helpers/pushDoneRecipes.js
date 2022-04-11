export default function pushDoneRecipesFunc(foodOrDrink, dataDetailed) {
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
  return newObjDone;
}

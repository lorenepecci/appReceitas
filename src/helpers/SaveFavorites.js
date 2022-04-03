export default function SaveFavorites(obj, type) {
  const newType = type.substring(0, type.length - 1);
  const favoriteRecipes = {
    id: obj.idDrink || obj.idMeal,
    type: newType,
    nationality: obj.strArea ? obj.strArea : '',
    category: obj.strCategory ? obj.strCategory : '',
    alcoholicOrNot: obj.strAlcoholic ? obj.strAlcoholic : '',
    name: obj.strDrink || obj.strMeal,
    image: obj.strDrinkThumb || obj.strMealThumb,
  };
  return favoriteRecipes;
}

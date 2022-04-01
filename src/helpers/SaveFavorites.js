export default function SaveFavorites(obj, type) {
  const favoriteRecipes = {
    id: obj.idDrink || obj.idMeal,
    type,
    nationality: obj.strArea,
    category: obj.strCategory,
    alcoholicOrNot: obj.strAlcoholic ? obj.strAlcoholic : '',
    name: obj.strDrink || obj.strMeal,
    image: obj.strDrinkThumb || obj.strMealThumb,
  };
  return favoriteRecipes;
}

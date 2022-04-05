export default function SaveFavorites(obj, type) {
  const newType = type.substring(0, type.length - 1);
  const favoriteRecipes = {
    id: obj.idDrink || obj.idMeal || obj.id,
    type: newType,
    nationality: obj.strArea ? obj.strArea : '',
    category: obj.strCategory ? obj.strCategory : '' || obj.category,
    alcoholicOrNot: obj.strAlcoholic ? obj.strAlcoholic : '' || obj.alcoholicOrNot,
    name: obj.strDrink || obj.strMeal || obj.name,
    image: obj.strDrinkThumb || obj.strMealThumb || obj.image,
  };
  return favoriteRecipes;
}

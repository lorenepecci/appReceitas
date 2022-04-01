export const getByType = async (id, foodOrDrink) => {
  let result;
  if (foodOrDrink === 'foods') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = response.json();
    result = data;
  } else if (foodOrDrink === 'drinks') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = response.json();
    result = data;
  }
  return result;
};

export const getRecommendations = async (foodOrDrink) => {
  let recommendations;
  if (foodOrDrink === 'foods') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    recommendations = response.json();
  } else if (foodOrDrink === 'drinks') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    recommendations = response.json();
  }
  return recommendations;
};

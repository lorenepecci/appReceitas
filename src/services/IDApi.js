export const getByType = async (id, foodOrDrink) => {
  let result;
  try {
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
  } catch (error) {
    return error;
  }
};

export const getRecommendations = async (foodOrDrink) => {
  let recommendations;
  try {
    if (foodOrDrink === 'foods') {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      recommendations = response.json();
    } else if (foodOrDrink === 'drinks') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      recommendations = response.json();
    }
    return recommendations;
  } catch (error) {
    return error;
  }
};

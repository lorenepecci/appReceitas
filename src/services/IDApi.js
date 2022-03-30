const getByType = async (id, foodOrDrink) => {
  let data;
  if (foodOrDrink === 'food') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    data = response.json();
  } else if (foodOrDrink === 'drink') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    data = response.json();
  }
  return data;
};

export default getByType;

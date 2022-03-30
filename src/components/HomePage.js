import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function HomePage({ foodOrDrink }) {
  const [foodCards, setFoodCards] = useState([]);
  const [drinkCards, setDrinkCards] = useState([]);
  const [urlForFetch, setUrlForFetch] = useState('');
  const [listCategories, setListCategories] = useState([{ strCategory: 'All' }]);

  const URLCategoriesFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const URLCategoriesDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const URLstartFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const URLstartDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const magicFor = 6;
  const magicTwelve = 12;

  const URLCategories = () => {
    if (foodOrDrink === 'food') return URLCategoriesFood;
    if (foodOrDrink === 'drink') return URLCategoriesDrink;
  };

  const URLstart = () => {
    if (foodOrDrink === 'food') return URLstartFood;
    if (foodOrDrink === 'drink') return URLstartDrink;
  };

  const saveDrinklist = (data) => {
    setDrinkCards(data.drinks
      .filter((_i, index) => index < magicTwelve));
  };

  const saveFoodlist = (data) => {
    setFoodCards(data.meals
      .filter((_i, index) => index < magicTwelve));
  };

  const setCardsForType = (data) => {
    if (foodOrDrink === 'food') {
      return saveFoodlist(data);
    }
    if (foodOrDrink === 'drink') {
      return saveDrinklist(data);
    }
  };

  const setListCategoriesForType = (categories) => {
    if (foodOrDrink === 'food') {
      return setListCategories((prev) => ([...prev, ...categories.meals]));
    }
    if (foodOrDrink === 'drink') {
      return setListCategories((prev) => ([...prev, ...categories.drinks]));
    }
  };

  const startAPI = async () => {
    try {
      const response = await fetch(URLstart());
      const data = await response.json();
      setCardsForType(data);
    } catch (error) {
      return error;
    }
  };
  const apiCategories = async () => {
    try {
      const response = await fetch(URLCategories());
      const categories = await response.json();
      setListCategoriesForType(categories);
      console.log(listCategories);
    } catch (error) {
      return error;
    }
  };

  const fetchByFilters = async () => {
    try {
      const response = await fetch(urlForFetch);
      const data = await response.json();
      console.log(data);
      if (data.meals) {
        saveFoodlist(data);
      }
      if (data.drinks) {
        saveDrinklist(data);
      }
    } catch (error) {
      return error;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { startAPI(); apiCategories(); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchByFilters(); }, [urlForFetch]);

  const onChangeCardsForCategory = (category) => {
    if (foodOrDrink === 'food') {
      if (category === 'All') {
        setUrlForFetch(URLstart);
      } else {
        setUrlForFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      }
    } else if (foodOrDrink === 'drink') {
      if (category === 'All') {
        setUrlForFetch(URLstart);
      } else {
        setUrlForFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      }
    }
  };

  return (
    <div>
      HomePage
      { listCategories.length
            && listCategories.filter((_, index) => index < magicFor)
              .map((category, i) => (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => onChangeCardsForCategory(category.strCategory) }
                >
                  {category.strCategory}
                </button>
              ))}
      { foodCards.length && (
        <div>
          { foodCards.map((item, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Card name={ item.strMeal } index={ index } img={ item.strMealThumb } />
            </div>
          )) }

        </div>
      ) }
      { drinkCards.length && (
        <div>
          { drinkCards.map((item, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Card name={ item.strDrink } index={ index } img={ item.strDrinkThumb } />
            </div>
          )) }

        </div>
      ) }

    </div>
  );
}

HomePage.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

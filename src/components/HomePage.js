import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MapCards from './MapCards';

export default function HomePage({ foodOrDrink }) {
  const [foodCards, setFoodCards] = useState([]);
  const [drinkCards, setDrinkCards] = useState([]);
  const [urlForFetch, setUrlForFetch] = useState('');
  const [isToggled, setIsToggled] = useState(true);
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

  const savelist = (data) => {
    if (foodOrDrink === 'drink') {
      setDrinkCards(data.drinks
        .filter((_i, index) => index < magicTwelve));
    }
    if (foodOrDrink === 'food') {
      setFoodCards(data.meals
        .filter((_i, index) => index < magicTwelve));
    }
  };

  const setCardsForType = (data) => {
    if (foodOrDrink === 'food') {
      return savelist(data);
    }
    if (foodOrDrink === 'drink') {
      return savelist(data);
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

  const apiCategories = async () => {
    try {
      const response = await fetch(URLCategories());
      const categories = await response.json();
      setListCategoriesForType(categories);
    } catch (error) {
      return error;
    }
  };

  const fetchByFilters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCardsForType(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => { fetchByFilters(URLstart()); apiCategories(); }, []);
  useEffect(() => { fetchByFilters(urlForFetch); }, [urlForFetch]);

  const onChangeCardsForCategory = (category) => {
    if (category === 'All') {
      setUrlForFetch(URLstart);
    } else if (foodOrDrink === 'food') {
      setUrlForFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    } else if (foodOrDrink === 'drink') {
      setUrlForFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    }
  };

  const onClickButtonCategorie = (category) => {
    if (isToggled) {
      onChangeCardsForCategory(category);
    } else {
      onChangeCardsForCategory('All');
    }
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <div className="container-header">
        { listCategories.length
            && listCategories.filter((_, index) => index < magicFor)
              .map((category, i) => (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ () => onClickButtonCategorie(category.strCategory) }
                >
                  {category.strCategory}
                </button>
              ))}
      </div>
      { foodCards.length && (
        <MapCards list={ foodCards } foodOrDrink={ foodOrDrink } />
      ) }
      { drinkCards.length && (
        <MapCards list={ drinkCards } foodOrDrink={ foodOrDrink } />
      ) }
    </div>
  );
}

HomePage.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

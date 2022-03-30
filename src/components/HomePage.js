import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function HomePage() {
  const [foodCards, setFoodCards] = useState([]);
  const [urlForFetch, setUrlForFetch] = useState('');
  const [listCategories, setListCategories] = useState([]);
  const URLCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const magicFor = 6;
  const magicTwelve = 12;

  const URLstart = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const startAPI = async () => {
    const response = await fetch(URLstart);
    const data = await response.json();
    setFoodCards(data.meals.filter((_i, index) => index < magicTwelve));
  };
  const apiCategories = async () => {
    const response = await fetch(URLCategories);
    const categories = await response.json();
    setListCategories(categories.meals);
  };

  const fetchByFilters = async () => {
    const response = await fetch(urlForFetch);
    const data = await response.json();
    setFoodCards(data.meals.filter((_i, index) => index < magicTwelve));
  };

  useEffect(() => { startAPI(); apiCategories(); }, []);
  useEffect(() => { fetchByFilters(); }, [urlForFetch]);

  const onChangeCardsForCategory = (category) => {
    setUrlForFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
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

    </div>
  );
}

import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function SearchBar({ foodOrDrink }) {
  const history = useHistory();
  const [searchState, setSearchState] = useState({
    searchInput: '',
    ingredient: false,
    name: false,
    firstLetter: false,
  });
  const { setFoodCards } = useContext(Context);
  const { setDrinkCards } = useContext(Context);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const foodTypeUrlFetch = () => {
    switch (searchState.option) {
    case 'ingredient':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchState.searchInput}`;
    case 'name':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchState.searchInput}`;
    case 'firstLetter':
      if (searchState.searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchState.searchInput}`;
    default:
      return '';
    }
  };

  const drinkTypeUrlFetch = () => {
    switch (searchState.option) {
    case 'ingredient':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchState.searchInput}`;
    case 'name':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchState.searchInput}`;
    case 'firstLetter':
      if (searchState.searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchState.searchInput}`;
    default:
      return '';
    }
  };

  const onClick = async () => {
    let response;
    if (foodOrDrink === 'food') {
      response = await fetch(foodTypeUrlFetch());
    }
    if (foodOrDrink === 'drink') {
      response = await fetch(drinkTypeUrlFetch());
    }
    const data = await response.json();
    const magicTwelve = 12;
    if (data.meals) {
      if (data.meals.length === 1) {
        history.push(`/foods/${data.meals[0].idMeal}`);
      } else {
        setFoodCards(data.meals.filter((_i, index) => index < magicTwelve));
      }
    } else if (data.drinks) {
      if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      } else {
        setDrinkCards(data.drinks.filter((_i, index) => index < magicTwelve));
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setFoodCards(false);
      setDrinkCards(false);
    }
  };

  return (
    <div>
      SearchBar

      <input
        data-testid="search-input"
        type="text"
        placeholder="Search Recipe"
        name="searchInput"
        value={ searchState.searchInput }
        onChange={ onInputChange }
      />

      <label htmlFor="Ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="Ingredient"
          name="option"
          value="ingredient"
          onChange={ onInputChange }
        />
        Ingredient
      </label>
      <label htmlFor="Name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="Name"
          name="option"
          value="name"
          onChange={ onInputChange }
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="firstLetter"
          value="firstLetter"
          name="option"
          onChange={ onInputChange }
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ onClick }
      >
        Search
      </button>

    </div>
  );
}

SearchBar.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchBar({ foodOrDrink }) {
  const history = useHistory();
  const [searchState, setSearchState] = useState({
    searchInput: '',
    ingredient: false,
    name: false,
    firstLetter: false,
  });
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
        alert('Your search must have only 1 (one) character');
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
        alert('Your search must have only 1 (one) character');
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

    if (data.meals && data.meals.length === 1) {
      history.push(`/foods/${data.meals[0].idMeal}`);
    }
    if (data.drinks && data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
      console.log(data);
    }
    console.log(data);
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

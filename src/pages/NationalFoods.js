/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import MapCards from '../components/MapCards';

export default function NationalFoods() {
  const magicTwelve = 12;
  const [state, setState] = useState('All');
  const [recipesList, setRecipes] = useState([]);
  const [listNationality, setListNationality] = useState([{
    strArea: 'All',
  }]);
  const urlNationalities = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const URLstartFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlState = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${state}`;

  const onInputChange = ({ target }) => {
    setState(target.value);
  };

  useEffect(() => {
    const FetchListNationality = async () => {
      const response = await fetch(urlNationalities);
      const data = await response.json();
      setListNationality((prev) => prev.concat(data.meals));
    };
    FetchListNationality();
  }, []);

  const FetchRecipesNationality = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.meals
      .filter((_i, index) => index < magicTwelve));
  };

  useEffect(() => {
    if (state === 'All') {
      FetchRecipesNationality(URLstartFood);
    } else {
      FetchRecipesNationality(urlState);
    }
  }, [state]);

  return (
    <div>
      <Header title="Explore Nationalities" showSearchIcon />
      <select
        data-testid="explore-by-nationality-dropdown"
        name="nationality"
        onChange={ onInputChange }
      >
        { listNationality.map((nationality, index) => (
          <option
            key={ index }
            data-testid={ `${nationality.strArea}-option` }
            value={ nationality.strArea }
          >
            { nationality.strArea }
          </option>
        ))}
      </select>

      { recipesList.length && (
        <MapCards list={ recipesList } foodOrDrink="food" />
      ) }
      <FooterPages />
    </div>
  );
}

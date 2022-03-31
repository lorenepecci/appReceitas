import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';

export default function ExplorerFoods() {
  const history = useHistory();
  const [listSurpriseRecipes, setListSurpriseRecipe] = useState([]);
  useEffect(() => {
    const FetchRange = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setListSurpriseRecipe(data.meals);
      } catch (error) {
        return error;
      }
    };
    FetchRange();
  }, []);

  const surpriseFunction = () => {
    const id = listSurpriseRecipes[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Header title="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => surpriseFunction() }
      >
        Surprise me!
      </button>
      <FooterPages />
    </div>
  );
}

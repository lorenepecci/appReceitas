import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';

export default function ExploreDrinks() {
  const history = useHistory();
  const [listSurpriseRecipes, setListSurpriseRecipe] = useState([]);
  useEffect(() => {
    const FetchRange = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setListSurpriseRecipe(data.drinks);
      } catch (error) {
        return error;
      }
    };
    FetchRange();
  }, []);

  const surpriseFunction = () => {
    const id = listSurpriseRecipes[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

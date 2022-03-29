import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();

  const handleClickFoods = (event) => {
    event.preventDefault();
    history.push('/explore/foods');
  };

  const handleClickDrinks = (event) => {
    event.preventDefault();
    history.push('/explore/drinks');
  };

  return (
    <div>
      <Header title="Explorar" />
      <button
        data-testid="explore-foods"
        type="button"
        onClick={ handleClickFoods }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ handleClickDrinks }
      >
        Explore Drinks
      </button>
      <FooterPages />
    </div>
  );
}

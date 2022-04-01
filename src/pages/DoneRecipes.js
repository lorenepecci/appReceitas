import React from 'react';
import Header from '../components/Header';
import { MockStorage } from '../helpers/createLocalStorage';

export default function DoneRecipes() {
  MockStorage();
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(getRecipes);
  return (
    <div>
      <Header title="Done Recipes" />
    </div>
  );
}

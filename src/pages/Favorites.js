import React from 'react';
import Header from '../components/Header';
import CardRecipesFavorite from '../components/CardRecipesFavorite';

export default function Favorites() {
  return (
    <div>
      <Header title="Favorite Recipes" />
      <CardRecipesFavorite />
    </div>
  );
}

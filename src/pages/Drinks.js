import React from 'react';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import HomePage from '../components/HomePage';

export default function Drinks() {
  return (
    <div>
      Drinks
      <Header title="Drinks" foodOrDrink="drink" showSearchIcon />
      <HomePage foodOrDrink="drink" />
      <FooterPages />
    </div>
  );
}

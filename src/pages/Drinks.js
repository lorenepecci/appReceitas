import React from 'react';
import Header from '../components/Header';
import FooterPages from '../components/FooterPages';

export default function Drinks() {
  return (
    <div>
      Drinks
      <Header title="Drinks" foodOrDrink="drink" showSearchIcon />
      <FooterPages />
    </div>
  );
}

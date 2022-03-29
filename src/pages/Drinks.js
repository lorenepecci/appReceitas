import React from 'react';
import Header from '../components/Header';
import FooterPages from '../components/FooterPages';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <div>
      Drinks
      <Header title="Drinks" showSearchIcon />
      <SearchBar foodOrDrink="drink" />
      <FooterPages />
    </div>
  );
}

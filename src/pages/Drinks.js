import React from 'react';
import Header from '../components/Header';
import FooterPages from '../Components/FooterPages';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <div>
      Drinks
      <Header title="Drinks" />
      <SearchBar foodOrDrink="drink" />
      <FooterPages />
    </div>
  );
}

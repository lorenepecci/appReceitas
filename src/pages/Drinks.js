import React from 'react';
import FooterPages from '../Components/FooterPages';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <div>
      Drinks
      <SearchBar foodOrDrink="drink" />
      <FooterPages />
    </div>
  );
}

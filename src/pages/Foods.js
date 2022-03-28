import React from 'react';
import SearchBar from '../components/SearchBar';
import FooterPages from '../Components/FooterPages';

export default function Foods() {
  return (
    <div>
      Foods
      <SearchBar foodOrDrink="food" />
      <FooterPages />
    </div>
  );
}

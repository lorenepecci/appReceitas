import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FooterPages from '../components/FooterPages';

export default function Foods() {
  return (
    <div>
      <Header title="Foods" />
      Foods
      <SearchBar foodOrDrink="food" />
      <FooterPages />
    </div>
  );
}

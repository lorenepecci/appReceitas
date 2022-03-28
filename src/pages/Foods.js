import React from 'react';
import SearchBar from '../components/SearchBar';

export default function Foods() {
  return (
    <div>
      Foods
      <SearchBar foodOrDrink="food" />
    </div>
  );
}

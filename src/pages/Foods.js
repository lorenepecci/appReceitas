import React from 'react';
import Header from '../components/Header';
import FooterPages from '../components/FooterPages';

export default function Foods() {
  return (
    <div>
      <Header title="Foods" foodOrDrink="food" showSearchIcon />
      Foods
      <FooterPages />
    </div>
  );
}

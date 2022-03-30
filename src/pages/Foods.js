import React from 'react';
import FooterPages from '../components/FooterPages';
import Header from '../components/Header';
import HomePage from '../components/HomePage';

export default function Foods() {
  return (
    <div>
      <Header title="Foods" foodOrDrink="food" showSearchIcon />
      <HomePage foodOrDrink="food" />
      <FooterPages />
    </div>
  );
}

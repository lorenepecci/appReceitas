import React from 'react';

export default function Card({ index, item }) {
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ item.strDrinkThumb }
        alt="drink"
      />
      <h1 data-testid={ `${index}-card-name` }>{item.strDrink}</h1>
    </div>
  );
}



import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

export default function MapCards({ list, foodOrDrink }) {
  return (

    <div className="container-items">
      { list.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          { foodOrDrink === 'food'
            ? <Card name={ item.strMeal } index={ index } img={ item.strMealThumb } />

            : <Card name={ item.strDrink } index={ index } img={ item.strDrinkThumb } /> }
        </div>
      ))}
    </div>
  );
}
MapCards.propTypes = {
  list: PropTypes.arrayOf(PropTypes.obejcts).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
};

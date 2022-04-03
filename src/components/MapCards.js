import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

export default function MapCards({ list, foodOrDrink }) {
  console.log(list);
  return (
    <div className="container-items">
      { list.map((item, index) => (
        <div key={ index }>
          <Card
            name={ item.strMeal || item.strDrink }
            index={ index }
            img={ item.strMealThumb || item.strDrinkThumb }
            id={ item.idMeal || item.idDrink }
            foodOrDrink={ foodOrDrink }
          />
        </div>
      ))}
    </div>
  );
}
MapCards.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

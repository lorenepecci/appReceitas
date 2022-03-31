import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

export default function MapCards({ list, foodOrDrink }) {
  return (

    <div className="container-items">
      {console.log(list)}
      { list.map((item, index) => (
        <div key={ index }>
          { foodOrDrink === 'food'
            ? (
              <Card
                name={ item.strMeal }
                index={ index }
                img={ item.strMealThumb }
                id={ item.idMeal }
                foodOrDrink={ foodOrDrink }
              />)

            : (

              <Card
                name={ item.strDrink }
                index={ index }
                img={ item.strDrinkThumb }
                id={ item.idDrink }
                foodOrDrink={ foodOrDrink }
              />)}
        </div>
      ))}
    </div>
  );
}
MapCards.propTypes = {
  list: PropTypes.arrayOf(PropTypes.obejcts).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
};

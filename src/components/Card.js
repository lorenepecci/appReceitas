import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ index, name, img, id, foodOrDrink }) {
  return (

    <div key={ index } data-testid={ `${index}-recipe-card` }>
      {console.log(foodOrDrink)}
      <h1 data-testid={ `${index}-card-name` }>{ name }</h1>
      <Link to={ `${foodOrDrink}s/${id}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="drink"
        />
      </Link>
    </div>

  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  foodOrDrink: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ index, name, img }) {
  return (
    <div key={ index } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt="drink"
      />
      <h1 data-testid={ `${index}-card-name` }>{name}</h1>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

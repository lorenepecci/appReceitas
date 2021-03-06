import PropTypes from 'prop-types';
import React from 'react';

export default function CardDetails({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <h1 data-testid={ `${index}-recomendation-title` }>{name}</h1>
      <img
        data-testid={ `${index}` }
        src={ img }
        alt="drink"
        width="50px"
      />
    </div>
  );
}

CardDetails.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';
import React from 'react';
import getByType from '../services/IDApi';

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const fetchData = async () => {
    const response = await getByType(id, foodOrDrink);
    return response;
  };

  fetchData();

  return (
    <div>
      DetailedRecipe
      {id}
    </div>
  );
}

DetailedRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      foodOrDrink: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

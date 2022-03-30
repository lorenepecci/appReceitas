import PropTypes from 'prop-types';
import React from 'react';

export default function DetailedRecipe({ match: { params: { id } } }) {
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
    }),
  }).isRequired,
};

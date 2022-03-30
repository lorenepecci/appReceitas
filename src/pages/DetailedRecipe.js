import PropTypes from 'prop-types';
import React from 'react';
import React, { useState, useEffect } from 'react';
import { getByType, getRecommendations } from '../services/IDApi';
import CardDetails from '../components/CardDetails';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getByType(id, foodOrDrink);
      console.log(response);
      return response;
    };
    fetchData();

    const fetchRecommendations = async () => {
      const response = await getRecommendations(foodOrDrink);
      const results = response.meals;
      console.log(response);
      setRecommendations(results
        .filter((item, index) => index <= LIMITED_OPTIONS));
    };
    fetchRecommendations();
  });
  return (
    <div>
      DetailedRecipe
      {id}
      {optionsRecommendations.map((options, index) => (
        <CardDetails
          key={ index }
          index={ index }
          name={ options.strMeal }
          img={ options.strMealThumb }
        />
      ))}
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

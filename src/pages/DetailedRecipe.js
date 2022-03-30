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
      return response;
    };
    fetchData();

    const fetchRecommendations = async () => {
      const response = await getRecommendations(foodOrDrink);
      const results = response.mels ? response.mels : response.drinks;
      setRecommendations(results.filter((item, index) => index <= LIMITED_OPTIONS));
    };
    fetchRecommendations();
  }, [foodOrDrink, id]);
  console.log(optionsRecommendations);
  return (
    <div>
      DetailedRecipe
      {id}
      {optionsRecommendations.map((options, index) => (
        <CardDetails
          key={ index }
          index={ index }
          name={ options.strMeal || options.strDrink }
          img={ options.strMealThumb || options.strDrinkThumb }
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
    }).isRequired,
  }).isRequired,
};

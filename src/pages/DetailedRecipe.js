import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getByType, getRecommendations } from '../services/IDApi';
import CardDetails from '../components/CardDetails';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  console.log('id:', id, 'foodOrDrink', foodOrDrink);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getByType(id, foodOrDrink);
      return response;
    };
    fetchData();

    const fetchRecommendations = async () => {
      const response = await getRecommendations(foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      setRecommendations(results.filter((_item, index) => index <= LIMITED_OPTIONS));
    };
    fetchRecommendations();
  }, [foodOrDrink, id]);
  console.log(optionsRecommendations);
  return (
    <div>
      DetailedRecipe
      {id}
      <ul className="last-receitas pre_con">
        {optionsRecommendations.map((options, index) => (
          <li key={ index } className="pre-card">
            <CardDetails
              className="cardDetails"
              index={ index }
              name={ options.strMeal || options.strDrink }
              img={ options.strMealThumb || options.strDrinkThumb }
            />
          </li>
        ))}
      </ul>
      <span className="container-btn-start">
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="btn-start"
        >
          Start Recipe

        </button>
      </span>
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

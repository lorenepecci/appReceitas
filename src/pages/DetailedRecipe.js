import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getByType, getRecommendations } from '../services/IDApi';
import CardDetails from '../components/CardDetails';
import DetailedComponent from '../components/DetailedComponent';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  const [dataDetailed, setDataDetailed] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getByType(id, foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      console.log(response);
      setDataDetailed(results);
    };
    fetchData();

    const fetchRecommendations = async () => {
      const response = await getRecommendations(foodOrDrink);
      const results = response.mels ? response.mels : response.drinks;
      setRecommendations(results.filter((item, index) => index <= LIMITED_OPTIONS));
    };
    fetchRecommendations();
  }, [foodOrDrink, id]);

  return (
    <div>
      DetailedRecipe
      {id}
      {<DetailedComponent dataDetailed={ dataDetailed } />}
      {optionsRecommendations.map((options, index) => (
        <CardDetails
          key={ index }
          index={ index }
          name={ options.strMeal || options.strDrink }
          img={ options.strMealThumb || options.strDrinkThumb }
        />
      ))}
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar receita
      </button>
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

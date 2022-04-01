import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CardDetails from '../components/CardDetails';
import { DoneRecipesStore, InProgressRecipesStore } from '../helpers/VerifyLocalStorage';
import Button from '../components/Button';
import { getByType, getRecommendations } from '../services/IDApi';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  const inProgressRecipes = InProgressRecipesStore(foodOrDrink, id)
    ? 'Continue Recipe' : 'Start Recipe';
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
  return (
    <div>
      <span className="title-DetailedRecipe">
        <h1>
          DetailedRecipe
        </h1>
      </span>
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
        {!DoneRecipesStore(id) ? <Button
          datatestid="start-recipe-btn"
          className="btn-start"
          text={ inProgressRecipes }

        /> : ''}
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

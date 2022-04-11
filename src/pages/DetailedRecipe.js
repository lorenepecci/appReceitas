import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import CardDetails from '../components/CardDetails';
import DetailedComponent from '../components/DetailedComponent';
import EmbededVideo from '../components/EmbededVideo';
import Context from '../context/Context';
import { DoneRecipesStore, InProgressRecipesStore } from '../helpers/VerifyLocalStorage';
import { getByType, getRecommendations } from '../services/IDApi';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  const {
    dataDetailed,
    setDataDetailed,
    setIDDetails,
    setGetResult,
    getResult,
  } = useContext(Context);
  const inProgressRecipes = InProgressRecipesStore(foodOrDrink, id)
    ? 'Continue Recipe' : 'Start Recipe';

  useEffect(() => {
    async function fetchData() {
      const response = await getByType(id, foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      setDataDetailed(results);
      setGetResult(true);
    }
    const fetchRecommendations = async () => {
      const response = await getRecommendations(foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      setRecommendations(results.filter((_item, index) => index <= LIMITED_OPTIONS));
    };
    fetchData();
    setIDDetails(id);
    fetchRecommendations();
  }, []);

  return (
    <div>
      <span className="title-DetailedRecipe">
        <h1>
          DetailedRecipe
        </h1>
      </span>
      {getResult
        ? (
          <DetailedComponent
            foodOrDrink={ foodOrDrink }
            id={ id }
          />
        )
        : <p>Carregando...</p> }
      {(getResult && foodOrDrink === 'foods')
        ? <EmbededVideo embedLink={ dataDetailed[0].strYoutube } /> : null }
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
          id={ id }
          type={ foodOrDrink }

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

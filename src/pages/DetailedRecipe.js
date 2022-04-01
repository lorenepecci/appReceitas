import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { getByType, getRecommendations } from '../services/IDApi';
import CardDetails from '../components/CardDetails';
import DetailedComponent from '../components/DetailedComponent';
import { DoneRecipesStore, InProgressRecipesStore } from '../helpers/VerifyLocalStorage';
import Context from '../context/Context';
import EmbededVideo from '../components/EmbededVideo';
import Button from '../components/Button';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  const {
    dataDetailed,
    setDataDetailed,
    getResult,
    setGetResult,
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
    fetchData();
  }, [foodOrDrink, id, setDataDetailed, setGetResult]);

  useEffect(() => {
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
      {getResult
        ? <DetailedComponent /> : <p>Carregando...</p>}
      {getResult && foodOrDrink === 'foods'
        ? <EmbededVideo embedLink={ dataDetailed[0].strYoutube } /> : <p>n</p>}
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

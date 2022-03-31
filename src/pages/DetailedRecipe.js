import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { getByType, getRecommendations } from '../services/IDApi';
import CardDetails from '../components/CardDetails';
import DetailedComponent from '../components/DetailedComponent';
import Context from '../context/Context';
import EmbededVideo from '../components/EmbededVideo';

const LIMITED_OPTIONS = 5;

export default function DetailedRecipe({ match: { params: { id, foodOrDrink } } }) {
  const [optionsRecommendations, setRecommendations] = useState([]);
  const {
    dataDetailed,
    setDataDetailed,
    getResult,
    setGetResult,
  } = useContext(Context);

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
  }, [foodOrDrink, id, setDataDetailed]);

  console.log('data1', dataDetailed, 'recomend', optionsRecommendations);

  return (
    <div>
      DetailedRecipe
      {id}
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

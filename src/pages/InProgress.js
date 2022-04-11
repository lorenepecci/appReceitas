import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Favorites from '../components/ButtonFavorites';
import Share from '../components/ButtonShare';
import ProgressComponent from '../components/ProgressComponent';
import Context from '../context/Context';
import setLocalStorage from '../helpers/createLocalStorage';
import getlocalStorage from '../helpers/getLocalStore';
import pushDoneRecipesFunc from '../helpers/pushDoneRecipes';
import { getByType } from '../services/IDApi';

const copy = require('clipboard-copy');

export default function InProgress({ match: { params: { id, foodOrDrink } } }) {
  const history = useHistory();
  const {
    setDataDetailed,
    setGetResult,
    dataDetailed,
  } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getByType(id, foodOrDrink);
      const results = response.meals ? response.meals : response.drinks;
      await setDataDetailed(results);
      await setGetResult(true);
    }
    fetchData();
  }, []);

  const handleClick = ({ target }) => {
    copy(`http://localhost:3000/${foodOrDrink}/${target.id}`);
    setIsLinkCopied(true);
  };
  const checkButton = (updatedCheckedState) => {
    const check = updatedCheckedState.every((value) => (value === true));
    setIsDisabled(!check);
  };

  const pushDoneRecipes = () => {
    const newObjDone = pushDoneRecipesFunc(foodOrDrink, dataDetailed);
    const getRecipes = getlocalStorage('doneRecipes');
    const newList = [...getRecipes, newObjDone];
    setLocalStorage('doneRecipes', newList);
    history.push('/done-recipes');
  };

  return (
    <div>
      {dataDetailed.length
        ? (
          <div>
            <img
              data-testid="recipe-photo"
              src={ foodOrDrink === 'foods' ? dataDetailed[0].strMealThumb
                : dataDetailed[0].strDrinkThumb }
              alt="Imagem da receita pronta"
              width="200px"
            />

            <h2 data-testid="recipe-title">
              { foodOrDrink === 'foods' ? dataDetailed[0].strMeal
                : dataDetailed[0].strDrink }
            </h2>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleClick }
            >
              <Share
                id={ foodOrDrink === 'foods' ? dataDetailed[0].idMeal
                  : dataDetailed[0].idDrink }
                alt="Icone de compartilhamento"
              />
            </button>
            <Favorites
              alt="Icone de favoritar"
              foodOrDrink={ foodOrDrink }
              id={ id }
            />

            {isLinkCopied ? <p>Link copied!</p> : null}
            <p data-testid="recipe-category">
              { foodOrDrink === 'foods' ? dataDetailed[0].strCategory
                : dataDetailed[0].strAlcoholic }
            </p>

            <ProgressComponent
              foodOrDrink={ foodOrDrink }
              id={ id }
              checkButton={ checkButton }
            />

            <h3>Instructions</h3>
            <p data-testid="instructions">
              { dataDetailed[0].strInstructions }
            </p>
          </div>
        )
        : <p>Carregando...</p>}
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ pushDoneRecipes }
        disabled={ isDisabled }
      >
        Finish Recipe
      </button>
    </div>
  );
}

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      foodOrDrink: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

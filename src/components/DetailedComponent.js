import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

const copy = require('clipboard-copy');

function DetailedComponent({ foodOrDrink, id }) {
  const {
    dataDetailed,
    listOfIngredients,
  } = useContext(Context);
  const newData = dataDetailed[0];
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleClick = () => {
    copy(window.location.href);
    setIsLinkCopied(true);
  };

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ newData.strMealThumb || newData.strDrinkThumb }
          alt="Imagem da receita pronta"
          width="200px"
        />
        <div>
          <h2 data-testid="recipe-title">
            { newData.strMeal || newData.strDrink }
          </h2>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleClick }
          >
            <Share
              datatestid="img-share-btn"
              alt="Icone de compartilhamento"
            />
          </button>
          <Favorites
            alt="Icone de favoritar"
            foodOrDrink={ foodOrDrink }
            id={ id }
          />
        </div>
        { isLinkCopied ? <p>Link copied!</p> : null }
        <p data-testid="recipe-category">
          { foodOrDrink === 'foods' ? newData.strCategory : newData.strAlcoholic }
        </p>

        <div>
          <h3>Ingredients</h3>
          <ul>
            {Object.values(listOfIngredients.ingredients).map((value, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${value} - ${Object.values(listOfIngredients.measure)[index]}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <p data-testid="instructions">
            { newData.strInstructions }
          </p>
        </div>
      </div>
    </div>
  );
}

DetailedComponent.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailedComponent;

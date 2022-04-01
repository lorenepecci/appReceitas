import React, { useContext } from 'react';
import Context from '../context/Context';
import Favorites from './Favorites';
import Share from './Share';

function DetailedComponent() {
  const {
    dataDetailed,
    // listOfIngredients,
    // setListOfIngredients,
  } = useContext(Context);

  const newData = dataDetailed[0];

  const removeEmptyFilter = (obj) => Object
    .fromEntries(Object.entries(obj).filter(([, v]) => v != null && v !== ''));

  const strIngredient = 'strIngredient';
  const filteredKeys = Object.keys(newData).filter((key) => key.match(strIngredient))
    .reduce((obj, key) => {
      obj[key] = newData[key];
      // return obj;
      return removeEmptyFilter(obj);
    }, {});
  console.log('results', newData);

  return (
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
        <Favorites
          data-testid="share-btn"
          alt="Icone de compartilhamento"
        />
        <button type="button">
          <Share
            data-testid="favorite-btn"
            alt="Icone de favoritar"
          />
        </button>
      </div>
      <p data-testid="recipe-category">
        { newData.strCategory }
      </p>
      <div>
        <h3>Ingredients</h3>
        {Object.values(filteredKeys).map((value, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {value}
          </p>
        ))}
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          { newData.strInstructions }
        </p>
      </div>
    </div>
  );
}

export default DetailedComponent;

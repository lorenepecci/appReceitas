// import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
// import Context from '../context/Context';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailedComponent({ dataDetailed }) {
  // const { dataDetailed } = useContext(Context);
  console.log('data2', dataDetailed);

  // const results = dataDetailed.mels ? dataDetailed.mels : dataDetailed.drinks;

  return (
    <div>
      <div>
        <h2 data-testid="recipe-title">
          nome
        </h2>
        <button type="button">
          <img
            data-testid="share-btn"
            src={ ShareIcon }
            alt="Icone de compartilhamento"
          />
        </button>
        <button type="button">
          <img
            data-testid="favorite-btn"
            src={ WhiteHeartIcon }
            alt="Icone de favoritar"
          />
        </button>
      </div>
      <p data-testid="recipe-category">
        categoria
      </p>
      <div>
        {dataDetailed.map((ingredientes, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {ingredientes}
          </p>
        ))}
      </div>
      <p data-testid="recipe-category">
        instruções
      </p>
    </div>
  );
}

DetailedComponent.propTypes = {
  dataDetailed: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};

export default DetailedComponent;

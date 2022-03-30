import React from 'react';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

const DetailedFood = () => (
  <div>
    <img data-testid="recipe-photo" src={ Foods } alt="Foto da receita pronta" />
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
      texto texto
    </p>
  </div>
);

export default DetailedFood;

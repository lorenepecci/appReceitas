import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import getlocalStorage from '../helpers/getLocalStore';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteRecipesButton from './FavoriteRecipesButton';

export default function CardRecipesFavorite() {
  const [isCopied, setCopied] = useState(false);
  const favoritesList = getlocalStorage('favoriteRecipes');
  const TREE_SECONDS = 3000;
  const handleClick = ({ target }) => {
    copy(`http://localhost:3000${target.name}`);
    setCopied(true);
    setInterval(() => setCopied(false), TREE_SECONDS);
  };
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { filterByTypeRecipe(''); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => { filterByTypeRecipe('food'); } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { filterByTypeRecipe('drink'); } }
        >
          Drinks
        </button>
      </div>
      {favoritesList.map((item, index) => (
        <div key={ index }>
          <Link
            to={ item.type === 'food'
              ? `/foods/${item.id}` : `/drinks/${item.id}` }
          >
            <img
              className="img-recipe"
              src={ item.image }
              data-testid={ `${index}-horizontal-image` }
              alt="Foto da receita feita"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {
              item.type === 'food'
                ? `${item.nationality} - ${item.category}` : `${item.alcoholicOrNot}`
            }
          </p>
          <Link
            to={ item.type === 'food'
              ? `/foods/${item.id}` : `/drinks/${item.id}` }
          >
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { item.name }

            </p>
          </Link>
          <button
            type="button"
            onClick={ handleClick }
          >
            <img
              name={ `/${item.type}s/${item.id}` }
              src={ ShareIcon }
              alt="Icone de compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {isCopied && <span>Link copied!</span>}
          <FavoriteRecipesButton
            datatestid={ `${index}-horizontal-favorite-btn` }
            alt="Icone de favoritar"
          />
        </div>
      ))}
    </div>
  );
}

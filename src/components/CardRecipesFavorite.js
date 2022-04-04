import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import getlocalStorage from '../helpers/getLocalStore';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

const copy = require('clipboard-copy');

export default function CardRecipesFavorite() {
  const [isCopied, setCopied] = useState(false);
  const favoritesList = getlocalStorage('favoriteRecipes');
  const handleClick = ({ target }) => {
    console.log(target.name);
    copy(`http://localhost:3000${target.name}`);
    setCopied(true);
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
            name={ `/${item.type}s/${item.id}` }
            type="button"
            onClick={ handleClick }
          >
            <Share
              name={ `/${item.type}s/${item.id}` }
              datatestid={ `${index}-horizontal-share-btn` }
              alt="Icone de compartilhamento"
            />
          </button>
          {isCopied && <span>Link copied!</span>}
          <Favorites
            dataLocation={ favoritesList[index] }
            idLocation={ item.id }
            datatestid={ `${index}-horizontal-favorite-btn` }
            alt="Icone de favoritar"
            foodOrDrink={ `${item.type}s` }
          />
        </div>
      ))}
    </div>
  );
}

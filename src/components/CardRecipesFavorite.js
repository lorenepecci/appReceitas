import React from 'react';
import { Link } from 'react-router-dom';
import getlocalStorage from '../helpers/getLocalStore';
import Favorites from './ButtonFavorites';
import Share from './ButtonShare';

export default function CardRecipesFavorite() {
  const favoritesList = getlocalStorage('favoriteRecipes');
  console.log(favoritesList);
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
            data-testid={ `${index}-horizontal-share-btn` }
            // onClick={ handleClick }
          >
            <Share
              datatestid={ `${index}-horizontal-share-btn` }
              alt="Icone de compartilhamento"
            />
          </button>
          <Favorites
            dataLocation={ favoritesList[index] }
            idLocation={ item.id }
            datatestid={ `${index}-horizontal-favorite-btn` }
            alt="Icone de favoritar"
            foodOrDrink={ item.type }
          />
        </div>
      ))}
    </div>
  );
}

import copy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import getlocalStorage from '../helpers/getLocalStore';
import SaveFavorites from '../helpers/SaveFavorites';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteRecipesButton from './FavoriteRecipesButton';

export default function CardRecipesFavorite() {
  const inicialState = getlocalStorage('favoriteRecipes');
  const { FavoriteList, setList } = useContext(Context);
  const [isCopied, setCopied] = useState(false);
  const TREE_SECONDS = 3000;
  const handleClick = ({ target }) => {
    copy(`http://localhost:3000${target.name}`);
    setCopied(true);
    setInterval(() => setCopied(false), TREE_SECONDS);
  };
  const filterByTypeRecipe = (type) => {
    if (type) {
      const results = inicialState.filter((item) => item.type === type);
      setList(results);
    } else {
      setList(inicialState);
    }
  };
  useEffect(() => {
    filterByTypeRecipe();
  }, []);
  return (
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
      {FavoriteList && FavoriteList.map((item, index) => (
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
            id={ item.id }
            datatestid={ `${index}-horizontal-favorite-btn` }
            alt="Icone de favoritar"
            obj={ SaveFavorites(item, `${item.type}s`) }
          />
        </div>
      ))}
    </div>
  );
}

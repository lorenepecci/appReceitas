import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [list, setList] = useState(getRecipes);

  const filterByTypeRecipe = (type) => {
    if (type === 'food') {
      return setList(getRecipes.filter((data) => data.type === 'food'));
    } if (type === 'drink') {
      return setList(getRecipes.filter((data) => data.type === 'drink'));
    } return setList(getRecipes);
  };

  const handleClick = ({ target }) => {
    copy(`http://localhost:3000${target.name}`);
    target.nextSibling.innerHTML = 'Link copied!';
  };

  return (
    <div>
      <Header title="Done Recipes" />
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
      <div>
        { list && list.map((item, index) => (
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
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
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
            <p data-testid={ `${index}-horizontal-done-date` }>
              {' '}
              { item.doneDate }
            </p>
            { item.type === 'food'
              ? (item.tags.map((tag, i) => (
                <p
                  data-testid={ `${index}-${item.tags[i]}-horizontal-tag` }
                  key={ tag }
                >
                  { tag }
                </p>
              )))
              : '' }
            <input
              name={ `/${item.type}s/${item.id}` }
              type="image"
              src={ shareIcon }
              alt="ícone de compartilhamento"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleClick }
            />
            <p />
          </div>
        ))}
      </div>
    </div>
  );
}

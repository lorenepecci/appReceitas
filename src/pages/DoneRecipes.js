import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import { MockStorage } from '../helpers/createLocalStorage';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes({ location }) {
  // const [copyToCleapBord, setCopyToCleapBord] = useState(false);
  MockStorage();
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [list, setList] = useState(getRecipes);

  const filterByTypeRecipe = (type) => {
    if (type === 'food') {
      console.log('food');
      return setList(getRecipes.filter((data) => data.type === 'food'));
    } if (type === 'drink') {
      console.log('drink');
      return setList(getRecipes.filter((data) => data.type === 'drink'));
    } return setList(getRecipes);
  };
  const teste = window.location.pathname;
  console.log(teste);
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
        { list.map((item, index) => (
          <div key={ index }>
            <Link
              to={ item.image === 'food'
                ? `/foods/${item.id}` : `/foods/${item.id}` }
            >
              <img
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
                  ? `${item.nationality} ${item.category}` : `${item.alcoholicOrNot}`
              }

            </p>
            <Link
              to={ item.type === 'food'
                ? `/foods/${item.id}` : `/drinks/${item.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{item.doneDate}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {' '}
              { item.doneDate }
            </p>
            { item.type === 'food'
              ? (item.tags.map((tag) => (
                <p
                  data-testid={ `${index}-${item.tags}-horizontal-tag` }
                  key={ tag }
                >
                  { tag }
                </p>
              )))
              : '' }
            <input
              type="image"
              src={ shareIcon }
              alt="ícone de compartilhamento"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => {
                copy(`http://localhost:3000${location.pathname}`);
                (<p>Link copied!</p>);
              } }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Clipboard ref from W3School: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

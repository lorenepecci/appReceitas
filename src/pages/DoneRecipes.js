import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import getlocalStorage from '../helpers/getLocalStore';
import { mokStorage } from '../helpers/createLocalStorage';

export default function DoneRecipes() {
  const [listCategories, setListCategories] = useState('all');
  mokStorage();
  const dataDoneRecipe = getlocalStorage('doneRecipes');
  console.log(dataDoneRecipe);

  // useEffect(() => {
  const filterByTypeRecipe = () => {
    if (listCategories === 'food') {
      return dataDoneRecipe
        .filter((data) => data.type === 'food');
    }
    if (listCategories === 'food') {
      return dataDoneRecipe
        .filter((data) => data.type === 'drink');
    }
    // }, []);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ listCategories }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ setListCategories('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ setListCategories('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        { filterByTypeRecipe().map((item, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

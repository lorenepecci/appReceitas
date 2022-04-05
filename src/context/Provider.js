import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [favorites, setfavorite] = useState({});
  const [idDetails, setIDDetails] = useState('');

  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  });
  const [foodCards, setFoodCards] = useState([]);
  const [drinkCards, setDrinkCards] = useState([]);
  const [urlForFetch, setUrlForFetch] = useState('');
  const [isFromIngredientsExplore, setIsFromIngredientsExplore] = useState(false);

  const [loginButtonDissabled, setLoginButtonDissabled] = useState(true);

  const [dataDetailed, setDataDetailed] = useState([]);

  const [getResult, setGetResult] = useState(false);

  const [listOfIngredients, setListOfIngredients] = useState({
    ingredients: {},
    measure: {},
  });

  const [mealsList, setMealsList] = useState([]);
  const [cocktailsList, setCocktailsList] = useState([]);

  const contextData = {
    isFromIngredientsExplore,
    setIsFromIngredientsExplore,
    urlForFetch,
    setUrlForFetch,
    drinkCards,
    setDrinkCards,
    foodCards,
    setFoodCards,
    userInfos,
    setUserInfos,
    loginButtonDissabled,
    setLoginButtonDissabled,
    dataDetailed,
    setDataDetailed,
    getResult,
    setGetResult,
    listOfIngredients,
    setListOfIngredients,
    favorites,
    setfavorite,
    idDetails,
    setIDDetails,
    mealsList,
    setMealsList,
    cocktailsList,
    setCocktailsList,
  };

  return (
    <Context.Provider value={ contextData }>
      { children }
    </Context.Provider>
  );
};
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

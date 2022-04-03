import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import DetailedRecipe from './pages/DetailedRecipe';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import Favorites from './pages/Favorites';
import Foods from './pages/Foods';
import IngredientsDrinks from './pages/IngredientsDrinks';
import IngredientsFoods from './pages/IngredientsFoods';
import InProgress from './pages/InProgress';
import Login from './pages/Login';
import NationalFoods from './pages/NationalFoods';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
      <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
      <Route exact path="/explore/foods/nationalities" component={ NationalFoods } />
      <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route
        exact
        path="/:foodOrDrink/:id"
        render={
          (props) => <DetailedRecipe { ...props } />
        }
      />
      <Route
        exact
        path="/:foodOrDrink/:id/in-progress"
        render={
          (props) => <InProgress { ...props } />
        }
      />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;

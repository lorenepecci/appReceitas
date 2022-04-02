import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DetailedRecipe from './pages/DetailedRecipe';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExplorerFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientsFoods from './pages/IngredientsFoods';
import IngredientsDrinks from './pages/IngredientsDrinks';
import NationalFoods from './pages/NationalFoods';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import Favorites from './pages/Favorites';
import InProgress from './pages/InProgress';
// import DetailsFoods from './DetailsFoods';
// import DetailsDrinks from './DetailsDrinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExplorerFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
      <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
      <Route exact path="/explore/foods/nationalities" component={ NationalFoods } />
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
    </Switch>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
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
import DetailsFoods from './DetailsFoods';
import DetailsDrinks from './DetailsDrinks';
import InProgressDrinks from './pages/InProgressDrinks';
import InProgressFoods from './pages/InProgressFoods';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/foods/:id" component={ DetailsFoods } />
      <Route exact path="/foods/:id/in-progress" component={ InProgressFoods } />

      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks:id" component={ DetailsDrinks } />
      <Route exact path="/drinks/:id/in-progress" component={ InProgressDrinks } />

      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExplorerFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
      <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
      <Route exact path="/explore/foods/nationalities" component={ NationalFoods } />
      <Route exact path="/profile" component={ () => <Profile /> } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;

// Tela de explorar: /explore;
// Tela de explorar comidas: /explore/foods;
// Tela de explorar bebidas: /explore/drinks;
// Tela de explorar comidas por ingrediente: /explore/foods/ingredients;
// Tela de explorar bebidas por ingrediente: /explore/drinks/ingredients;
// Tela de explorar comidas por nacionalidade: /explore/foods/nationalities;
// Tela de perfil: /profile;
// Tela de receitas feitas: /done-recipes;
// Tela de receitas favoritas: /favorite-recipes.

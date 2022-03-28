import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default App;

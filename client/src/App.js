import './App.css';
import React from 'react';
import 'fontsource-roboto';
import Recipes from './screens/home.js'
import RecipeForm from './screens/newRecipe'
import {Switch, BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
         <Route exact path="/" component={Recipes}></Route> 
        <Route exact path="/newRecipe" component={RecipeForm}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import React from 'react';
import 'fontsource-roboto';
import Login from './screens/login.js'
import Recipes from './screens/home.js'
import RecipeForm from './screens/newRecipe'
import ShowRecipe from './screens/showRecipe'
import {Switch, BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
         <Route exact path="/" component={Login}></Route> 
         <Route exact path="/home" component={Recipes}></Route>
        <Route exact path="/newRecipe" component={RecipeForm}></Route>
        <Route exact path="/showRecipe" component={ShowRecipe}></Route>
      </Switch>
    </Router>
  );
}

export default App;

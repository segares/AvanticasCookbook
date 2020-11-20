import '../App.css';
import axios from 'axios';
import React from 'react';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {useHistory} from "react-router-dom";
import CategorySelect from '../components/CategorySelect';

class Recipes extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER
    });
    instance.get(`/recipes`)
      .then(res => {
        const recipesData = res.data;
        this.setState({ recipes: recipesData });
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Filters />
        <RecipeList recipesData={this.state.recipes} />
      </div>
    );
  }
}

function Filters(props) {
  const history = useHistory()
  
  return (
    <div className="filters">
      <CategorySelect />
      <FormControl>
        <TextField label="Recipe" variant="outlined" id="element_1" name="element_1" maxlength="255" />
      </FormControl>
      <FormControl>
         <Button variant="contained" color="primary" onclick="location.href = 'createRecipe.html';" id="newRecipe" onClick={()=> history.push("/newRecipe")} >New</Button> 
      </FormControl>
    </div>)
}

function RecipeList(props) {
  const recipesData = props.recipesData;
  const recipes = recipesData.map((recipe) =>
    <div>
      <img src={recipe.picture} alt="Recipe." />
      <div>{recipe.recipeName}</div>
      <div>{recipe.categoryName}</div>
    </div>
  );
  return <div className="recipesContainer">{recipes}</div>;
}

export default Recipes;
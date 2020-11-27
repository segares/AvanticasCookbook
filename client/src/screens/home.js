import '../App.css';
import axios from 'axios';
import React from 'react';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {useHistory} from "react-router-dom";
import CategorySelect from '../components/CategorySelect.js';
import {fetchRecipesPending, fetchRecipesSuccess, fetchRecipesError} from '../actions.js';
import {getRecipesError, getRecipes, getRecipesPending} from '../reducers.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Recipes extends React.PureComponent {
 

  componentDidMount() {
    /* const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER
    });
    instance.get(`/recipes`)
      .then(res => {
        const recipesData = res.data;
        this.setState({ recipes: recipesData });
      }).catch(error => console.log(error)) */
      const {fetchRecipes} = this.props;
      console.log("fetchRecipes:", fetchRecipes)
      fetchRecipes();
  }

  render() {
    const {recipes, error, pending} = this.props;
    if(!recipes){
      return <h1>Not recipes</h1>
    }
    return (
      <div>
        <Filters />
        <RecipeList recipesData={recipes} />
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
        <TextField label="Recipe" variant="outlined" id="element_1" name="element_1" maxLength="255" />
      </FormControl>
      <FormControl>
         <Button variant="contained" color="primary" id="newRecipe" onClick={()=> history.push("/newRecipe")} >New</Button> 
      </FormControl>
    </div>)
}

function fetchFilteredRecipes() {
  console.log("Executing fetch:")
  return dispatch => {
      dispatch(fetchRecipesPending());
      fetch('http://localhost:3001/api/recipes')
      .then(res => res.json())
      .then(res => {
          if(res.error) {
              throw(res.error);
          }
          console.log("SUCCESS FETCH:", res)
          dispatch(fetchRecipesSuccess(res));
          return res.recipes;
      })
      .catch(error => {
          dispatch(fetchRecipesError(error));
      })
  }
}


function RecipeList(props) {
  const recipesData = props.recipesData;
  const recipes = recipesData.map((recipe) =>
    <div key= {recipe.recipeid}>
      <img src={recipe.picture} alt="Recipe." />
      <div>{recipe.recipename}</div>
      <div>{recipe.categoryname}</div>
    </div>
  );
  return <div className="recipesContainer">{recipes}</div>;
}

const mapStateToProps = state => ({
  error: getRecipesError(state),
  recipes: getRecipes(state),
  pending: getRecipesPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRecipes: fetchFilteredRecipes
}, dispatch)

//export default Recipes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);

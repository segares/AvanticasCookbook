import '../App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CategorySelect from '../components/CategorySelect';
import Ingredients from '../components/Ingredients.js';

import axios from 'axios';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    const { recipe } = this?.props?.location?.state || {};
    var {
      recipename = '',
      cheffname = '',
      categoryname = 'All Recipes',
      ingredients = [],
      recipeid = '',
    } = recipe || {};
    this.state = {
      recipename,
      cheffname,
      categoryname,
      ingredients,
      recipeid,
    };
    if (this.state.ingredients === {}) {
      this.state.ingredients = [];
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var action = '/createRecipe';
    if (this.state.isEditing) {
      action = '/editRecipe';
    }
    const { history } = this.props;
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
    });
    const { recipename, cheffname, preparation, categoryname, ingredients, recipeid } = this.state;
    instance
      .post(action, {
        recipename,
        cheffname,
        preparation,
        categoryname,
        ingredients,
        recipeid,
      })
      .then((res) => {
        history.push('/home');
      })
      .catch((error) => alert('Validation Pending'));
  };

  handleDelete() {
    const { history } = this.props;
    const { recipeid } = this.state;
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER,
    });
    instance
      .post(`/removeRecipe`, {
        recipeid,
      })
      .then((res) => {
        history.push('/home');
      })
      .catch((error) => alert('Error removing!'));
  }

  handleAddIngredient = (name, quantity) => {
    const ingredient = { name, quantity };
    var ingredients = this.state.ingredients;

    if (!Array.isArray(ingredients)) {
      ingredients = [];
      this.setState(ingredients);
    }
    console.log('ING', ingredients);
    ingredients.push(ingredient);
    this.setState(ingredients);
  };

  render() {
    const { isEditing } = this?.props?.location?.state || {};
    const width = 550;
    return (
      <form id="newRecipeForm" onSubmit={this.handleSubmit}>
        <div className="recipeForm">
          <FormControl>
            <TextField
              label="Recipe Name"
              variant="outlined"
              id="recipename"
              name="recipename"
              value={this.state.recipename}
              onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Cheff Name"
              variant="outlined"
              id="cheffname"
              name="cheffname"
              value={this.state.cheffname}
              onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
            />
          </FormControl>
          <FormControl>
            <CategorySelect
              categoryname={this.state.categoryname}
              onChange={(event) => this.setState({ categoryname: event.target.value })}
            />
          </FormControl>
          <Ingredients
            ingredients={this.state.ingredients}
            handleAddIngredient={this.handleAddIngredient}
          />

          <TextField
            style={{ width }}
            label="Preparation"
            variant="outlined"
            id="preparation"
            name="preparation"
            multiline={true}
            rowsMax={6}
            value={this.state.preparation}
            onChange={(event) => this.setState({ [event.target.name]: event.target.value })}
          />

          <div className="updatedRecipeButtons">
            <Button variant="contained" color="primary" type="submit" id="save">
              Save
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="secondary"
                id="delete"
                onClick={() => {
                  this.handleDelete();
                }}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default RecipeForm;

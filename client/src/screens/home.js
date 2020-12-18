import '../App.css';
import 'fontsource-roboto';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Filters from '../components/Filters.js';
import RecipeList from '../components/RecipeList.js';
import { fetchRecipesPending, fetchRecipesSuccess, fetchRecipesError } from '../actions.js';
import { getRecipesError, getRecipes, getRecipesPending } from '../reducers.js';

class Recipes extends React.PureComponent {
  componentDidMount() {
    const { fetchRecipes } = this.props;
    fetchRecipes('');
  }

  render() {
    const { recipes, fetchRecipes } = this.props;
    return (
      <div>
        <Filters searchHandler={fetchRecipes} />
        <RecipeList recipesData={recipes} />
      </div>
    );
  }
}

function fetchFilteredRecipes(filter) {
  return (dispatch) => {
    dispatch(fetchRecipesPending());
    var url = new URL('http://localhost:3001/api/recipes');
    var params = { filter: filter };

    url.search = new URLSearchParams(params).toString();

    fetch(url, { credentials: 'same-origin' })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchRecipesSuccess(res));
        return res.recipes;
      })
      .catch((error) => {
        dispatch(fetchRecipesError(error));
      });
  };
}

const mapStateToProps = (state) => ({
  error: getRecipesError(state),
  recipes: getRecipes(state),
  pending: getRecipesPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRecipes: fetchFilteredRecipes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

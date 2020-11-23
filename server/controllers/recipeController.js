import getAllRecipes from '../dal/recipeDao.js';
import log from '../public/logs.js';

export const getFilteredRecipes = (filter) => {
  if (filter != null && filter != '') {
    const recipesResult = getAllRecipes();
    log.info(recipesResult);
    return recipesResult;
  } else {
  }
  return null;
};

function createRecipe(recipe) {}

export default { getFilteredRecipes, createRecipe };

import {
  checkDatabase,
  getAllRecipes,
  getRecipesByName,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeRating,
  insertReviewValue,
} from '../dal/recipeDao.js';
import { getLoggedUser } from './loginController.js';
import log from '../public/logs.js';

const successResponse = (res) => res.status(200).json({ success: true });
const failResponse = (res) => res.status(400).json({ success: false });

export const getFilteredRecipes = async (req) => {
  const recipeName = req.query.filter;
  let recipesResult;

  if (recipeName && recipeName !== '') {
    recipesResult = await getRecipesByName(recipeName);
  } else {
    recipesResult = await getAllRecipes();
  }

  return recipesResult;
};

export const createRecipe = async (req, res) => {
  const { recipename, cheffname, categoryname, preparation, ingredients } = req.body;
  try {
    await insertRecipe({
      recipename,
      cheffname,
      categoryname,
      preparation,
      ingredients: JSON.stringify(ingredients),
    });
    return successResponse(res);
  } catch (error) {
    console.log(error);
    return failResponse(res);
  }
};

export const editRecipe = async (req, res) => {
  const { recipename, cheffname, categoryname, preparation, ingredients, recipeid } = req.body;
  try {
    await updateRecipe(recipename, cheffname, categoryname, preparation, ingredients, recipeid);
    return successResponse(res);
  } catch (error) {
    return failResponse(res);
  }
};

export const removeRecipe = async (req, res) => {
  const { recipeid } = req.body;
  try {
    await deleteRecipe(recipeid);
    return successResponse(res);
  } catch (error) {
    return failResponse(res);
  }
};

export const checkIfRecipeSchemaExist = async () => {
  const result = checkDatabase();
  return result.rowCount > 0;
};

export const editRecipeRating = async (req, res) => {
  const { recipeid, reviewvalue } = req.body;
  const { userid } = getLoggedUser();
  try {
    console.log('USERID', getLoggedUser());
    await insertReviewValue(recipeid, userid, reviewvalue);
    await updateRecipeRating(recipeid);
    return successResponse(res);
  } catch (error) {
    console.log(error);
    return failResponse(res);
  }
};

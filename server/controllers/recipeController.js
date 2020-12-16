import jwt from 'jsonwebtoken';
import {
  checkDatabase,
  getAllRecipes,
  getRecipesByName,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
} from '../dal/recipeDao.js';
import log from '../public/logs.js';

const successResponse = (res) => res.status(200).json({ success: true });
const failResponse = (res) => res.status(400).json({ success: false });

const users = {
  admin: { password: 'pass' },
  mary: { password: 'passwordmary' },
};

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

export const checkIfRecipeSchemaExist = async () => {
  const result = checkDatabase();
  return result.rowCount > 0;
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

export const validateLogin = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;

  if (!username || !password || users[username].password !== password) {
    return res.status(401).send();
  }

  const payload = { username: username };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  users[username].refreshToken = refreshToken;
  res.cookie('jwt', accessToken, { secure: true, httpOnly: true });

  return res.send();
};

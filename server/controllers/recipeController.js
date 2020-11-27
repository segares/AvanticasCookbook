import getAllRecipes from '../dal/recipeDao.js';
import log from '../public/logs.js';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

let users = {
  admin: { password: 'pass' },
  mary: { password: 'passwordmary' },
};

export const getFilteredRecipes = async (filter) => {
  const recipesResult = await getAllRecipes();
  log.info(recipesResult);
  return recipesResult;
};

function createRecipe(recipe) {}

export const validateLogin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // Neither do this!
  if (!username || !password || users[username].password !== password) {
    return res.status(401).send();
  }

  //use the payload to store information about the user such as username, user role, etc.
  let payload = { username: username };

  //create the access token with the shorter lifespan
  console.log(jwt);
  let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  //create the refresh token with the longer lifespan
  let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  //store the refresh token in the user array
  users[username].refreshToken = refreshToken;

  //send the access token to the client inside a cookie
  res.cookie('jwt', accessToken, { secure: true, httpOnly: true });

  return res.send();
};

export default { getFilteredRecipes, createRecipe, validateLogin };

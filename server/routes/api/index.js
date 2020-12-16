import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import {
  getFilteredRecipes,
  validateLogin,
  createRecipe,
  editRecipe,
  removeRecipe,
} from '../../controllers/recipeController.js';

dotenv.config();
const router = express.Router();
router.use(bodyParser.json());
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/recipes', async (req, res) => {
  const recipeResponse = await getFilteredRecipes(req);
  res.json(recipeResponse);
});

router.post('/createRecipe', async (req, res) => {
  const result = await createRecipe(req, res);
  return result;
});

router.post('/editRecipe', async (req, res) => {
  const result = await editRecipe(req, res);
  return result;
});

router.post('/removeRecipe', async (req, res) => {
  const result = await removeRecipe(req, res);
  return result;
});

router.post('/validateAuth', (req, res) => {
  validateLogin(req, res);
});

export default router;

import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import auth from '../../middleware/auth.js';

import validateLogin from '../../controllers/loginController.js';
import {
  getFilteredRecipes,
  createRecipe,
  editRecipe,
  removeRecipe,
  editRecipeRating,
} from '../../controllers/recipeController.js';

dotenv.config();
const router = express.Router();
router.use(cors({ origin: true, credentials: true }));
router.use(bodyParser.json());
router.use(cookieParser());
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/recipes', auth, async (req, res) => {
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

router.post('/rateRecipe', (req, res) => {
  editRecipeRating(req, res);
});

export default router;

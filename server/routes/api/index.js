import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { getFilteredRecipes, validateLogin } from '../../controllers/recipeController.js';
import auth from '../../middleware/auth.js';

dotenv.config();
const router = express.Router();
router.use(bodyParser.json());

//router.get('/', auth, router)
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/recipes', async (req, res) => {
  const recipeResponse = await getFilteredRecipes('Test');
  res.json(recipeResponse);
});

router.get('/newrecipe', (req, res) => {
  res.render('createRecipe');
});

router.post('/validateAuth', (req, res) => {
  validateLogin(req, res);
});

export default router;

import express from 'express';
import RecipeController from '../../controllers/recipeController.js'

const app = express
const router = express.Router();


router.get('/', function(req, res){
  res.render('login');
});

router.get('/recipes', async function (req, res) {
    res.json(RecipeController.getFilteredRecipes("Test"));
})

router.get('/newrecipe', function(req, res){
  res.render('createRecipe');
});


router.post('/validateAuth', function(req, res){
 
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: "+ username);
  if (username == "admin" && password == "password") {
    req.session.user = 'admin'
    res.redirect("/recipes");
    next();
  }
});

export default router;
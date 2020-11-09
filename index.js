import express from 'express';
import bodyParser from 'body-parser';
const app = express()
const port = 3000
const session = require('express-session')
const FileStore = require('session-file-store')(session)
var path = require('path');

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');
app.use(express.static('public'))
//app.use(cookierParser('abcdef-12345'))
const auth = require('./middleware/auth');
app.use(express.urlencoded({
  extended: true
}))

app.use(session({
  name:'session-id',
  secret:'123456xxx',
  saveUninitialized:false,
  resave:false,
  store:new FileStore()
}))

var unless = function(path, middleware) {
  return function(req, res, next) {
      if (path === req.path) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};

app.use(unless('/validateAuth', auth));

app.get('/', function(req, res){
  res.render('login');
});

app.get('/recipes', function (req, res) {
  const recipes = require('./listRecipes.json');
  res.render('index', { recipes: recipes })
})

app.get('/newrecipe', function(req, res){
  res.render('createRecipe');
});

app.post('/validateAuth', function(req, res){
 
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: "+ username);
  if (username == "admin" && password == "password") {
    req.session.user = 'admin'
    res.redirect("/recipes");
    next();
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
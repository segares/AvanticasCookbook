import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import fileStore from 'session-file-store';
import auth from './middleware/auth.js'

const app = express()
const port = 3001
const file_store = fileStore(session);

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))

app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'pug');

 app.use(session({
  name:'session-id',
  secret:'123456xxx',
  saveUninitialized:false,
  resave:false,
  store: new file_store()
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

//app.use(unless('/validateAuth', auth));

app.get('/', function(req, res){
  res.render('login');
});

app.get('/recipes', function (req, res) {
  let rawdata = fs.readFileSync('listRecipes.json');
  let recipesResult = JSON.parse(rawdata);
  res.json(recipesResult);
  //res.render('index', { recipes: student })
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
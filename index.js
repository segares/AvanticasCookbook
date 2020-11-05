const express = require('express')
const app = express()
const port = 3000
var path = require('path');

// app.get('/recipes', (req, res) => {
  // const recipes = require('./listRecipes.json');
  // res.send(recipes);
// })
// 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})



app.listen(port, () => {
 
  console.log(`Example app listening at http://localhost:${port}`)
})
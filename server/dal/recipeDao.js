import fs from 'fs';
import knex from '../database/config.js'
//import listFile from './listRecipes.json'

function getAllRecipes() {
  const rawdata = fs.readFileSync('listRecipes.json');

  knex.raw('select * from recipe').then(function (resp) {
    console.log("DATABASE RESULT:" +resp.rows);
  });

  let recipesResult = JSON.parse(rawdata);
  //console.log(recipesResult)
  return recipesResult;
}


function getRecipeByName() {

}

export default getAllRecipes;
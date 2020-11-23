import fs from 'fs';
import knex from '../database/config.js';

async function getAllRecipes() {
  const rawdata = fs.readFileSync('listRecipes.json');

  let query;

  try {
    query = await knex.raw('select * from recipe');
  } catch (error) {
    console.log(error);
  }

  return query;

  console.log('DATABASE RESULT:' + resp.rows);

  let recipesResult = JSON.parse(rawdata);
  //console.log(recipesResult)
  return recipesResult;
}

function getRecipeByName() {}

export default getAllRecipes;

import fs from 'fs';
import knex from '../database/config.js';

async function getAllRecipes() {
  const rawdata = fs.readFileSync('listRecipes.json');

  let query;

  try {
    query = await knex.raw('select * from recipe');
    //console.log('DATABASE RESULT:', query);
  } catch (error) {
    console.log(error);
  }

  return query.rows;
}

function getRecipeByName() {}

export default getAllRecipes;

import fs from 'fs';
import path from 'path';
import knex from '../database/config.js';

export const getAllRecipes = async () => {
  let query;

  try {
    query = await knex.raw('SELECT * FROM RECIPE');
  } catch (error) {
    console.log(error);
  }
  return query.rows;
};

export const getRecipesByName = async (recipeName) => {
  const query = `SELECT * FROM RECIPE WHERE RECIPENAME LIKE '%${recipeName}%'`;
  var result;
  try {
    result = await knex.raw(query);
  } catch (error) {
    console.log(error);
  }
  return result.rows;
};

export const checkDatabase = async () => {
  const query = 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :database';
  const database = 'public';
  var result;
  try {
    result = await knex.raw(query, {
      database,
    });

    if (result.rowCount === 0) {
      processSQLFile(path.join(path.resolve(), 'dal/backup.sql'));
    }
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const insertRecipe = async ({
  recipename,
  cheffname,
  categoryname,
  preparation,
  ingredients,
}) => {
  console.log('ING', ingredients);
  const query =
    'INSERT INTO RECIPE (recipename, cheffname, categoryname, ingredients, preparation) VALUES (:recipename, :cheffname, :categoryname, :ingredients, :preparation)';
  await knex.raw(query, {
    recipename,
    cheffname,
    categoryname,
    ingredients,
    preparation,
  });

  return knex.destroy;
};

export const updateRecipe = async (
  recipename,
  cheffname,
  categoryname,
  ingredients,
  preparation,
  recipeid
) => {
  try {
    const query =
      'UPDATE RECIPE SET recipename = :recipename, cheffname= :cheffname, categoryname= :categoryname, ingredients= :ingredients, preparation= :preparation WHERE recipeid = :recipeid';
    await knex.raw(query, {
      recipename,
      cheffname,
      categoryname,
      ingredients,
      preparation,
      recipeid,
    });
  } catch (error) {
    console.log(error);
  }
  return knex.destroy;
};

export const deleteRecipe = async (recipeid) => {
  try {
    const query = 'DELETE FROM RECIPE WHERE recipeid = :recipeid';
    await knex.raw(query, { recipeid });
  } catch (error) {
    console.log(error);
  }
  return knex.destroy;
};

const processSQLFile = async (fileName) => {
  // Extract SQL queries from files. Assumes no ';' in the fileNames
  const queries = fs
    .readFileSync(fileName, 'utf-8')
    .toString()
    .replace(/^.*--.*$/gm, ' ')
    .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(';') // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter((el) => el.length !== 0); // remove any empty ones

  // Execute each SQL query sequentially

  for (const query of queries) {
    try {
      console.log(query);
      await knex.raw(query);
    } catch (error) {
      console.log(error);
    }
  }
};

export default getAllRecipes;

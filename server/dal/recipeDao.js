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
  let result;
  try {
    result = await knex.raw(query);
  } catch (error) {
    console.log(error);
  }
  return result.rows;
};

export const insertRecipe = async ({
  recipename,
  cheffname,
  categoryname,
  preparation,
  ingredients,
}) => {
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

export const insertReviewValue = async (recipeid, userid, reviewvalue) => {
  let query =
    'INSERT INTO RECIPE_VIEW (recipeid, userid, reviewvalue) VALUES (:recipeid, :userid, :reviewvalue)';
  await knex.raw(query, {
    recipeid,
    userid,
    reviewvalue,
  });

  return knex.destroy;
};

export const updateRecipeRating = async (recipeid) => {
  let query =
    'update recipe set rating = (select round( cast(avg(reviewvalue) as numeric),1) from recipe_review where recipeid = :recipeid group by recipeid) where recipeid = :recipeid';
  await knex.raw(query, {
    recipeid,
  });
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

export const checkDatabase = async () => {
  const query = 'SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = :table';
  const table = 'recipe';
  let result;
  try {
    result = await knex.raw(query, {
      table,
    });

    if (result.rowCount === 0) {
      processSQLFile(path.join(path.resolve(), 'dal/backup.sql'));
    }
  } catch (error) {
    console.log(error);
  }

  return result;
};

export default getAllRecipes;

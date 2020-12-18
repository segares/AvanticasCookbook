import knex from '../database/config.js';

const getUserByNameAndPassword = async (username, password) => {
  const query = 'SELECT * FROM RECIPE_USER WHERE USERNAME = :username AND PASSWORD = :password';

  let result;
  try {
    result = await knex.raw(query, { username, password });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default getUserByNameAndPassword;

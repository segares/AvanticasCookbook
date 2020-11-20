import knexDb from 'knex';
import config from '../config.js'

var knex = knexDb({
    client: config.db.client,
    connection: {
      host : config.db.host,
      user : config.db.user,
      password : config.db.password,
      database : config.db.database
    }
  });

  export default knex;
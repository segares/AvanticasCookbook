import knexDb from 'knex';

var knex = knexDb({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'admin',
      password : 'admin',
      database : 'postgres'
    }
  });

  export default knex;
import process from 'node:process';

//not really needed for now, but in case more things need to be added
export default () => ({
  port: parseInt(process.env.NEST_APP_PORT ?? '9999', 10),
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  }
})
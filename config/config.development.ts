// eslint-disable-next-line @typescript-eslint/no-var-requires
export default () => ({
  port: 3000,
  database: {
    dialect: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    database: process.env.DB_DATABASE || 'cvmaker',
    password: process.env.DB_PASSWORD,
  },
});

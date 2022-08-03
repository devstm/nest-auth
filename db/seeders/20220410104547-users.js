/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('@faker-js/faker');

const users = [...Array(50)].map((_, i) => ({
  email: faker.faker.internet.email(),
  username: faker.faker.internet.userName(),
  password: faker.faker.internet.password(8),
  created_at: new Date(),
  updated_at: new Date(),
}));
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

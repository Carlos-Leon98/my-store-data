const { User, UserSchema } = require('./user.models');
const { Customer, UserCustomer, CustomerSchema } = require('./customer.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;

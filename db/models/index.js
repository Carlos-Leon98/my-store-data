const { User, UserSchema } = require('./user.models');
const { Customer, UserCustomer, CustomerSchema } = require('./customer.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
}

module.exports = setupModels;

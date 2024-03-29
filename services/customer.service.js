const boom = require("@hapi/boom");
const { models } = require("../lib/sequelize");

class CustomerService {

  constructor(){}

  async find() {
    const response = await models.Customer.findAll({
      include: ['user']
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Customer not Found");
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, data) {
    const model = await this.findOne(id);
    if (!customer) {
      throw boom.notFound("Customer not Found");
    }
    const response = await model.update(data)
    return response
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { response: true}
  }
}

module.exports = CustomerService;

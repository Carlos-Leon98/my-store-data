const boom = require("@hapi/boom");
const { models } = require("../lib/sequelize");

class CustomerService {

  constructor(){}

  async find() {
    const response = await models.Customer.findAll();
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
    return data;
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

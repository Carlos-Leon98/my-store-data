const boom = require('@hapi/boom');

const sequelize = require('../lib/sequelize');

class OrderService {

  constructor(){}

  async create(data) {
    return data;
  }

  async find() {
    const query = 'SELECT * FROM task';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;

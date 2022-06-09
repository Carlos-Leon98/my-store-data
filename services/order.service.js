const boom = require('@hapi/boom');

const { models } = require('../lib/sequelize');

const sequelize = require('../lib/sequelize');

class OrderService {

  constructor(){}

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(date);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }, 'items']
    });
    return order;
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

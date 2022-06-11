const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../lib/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    };
    const { price } = query;
    if (query) {
      options.where.price = price;
    };
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    return product;
  }

  async update(id, changes) {
    const product = this.findOne(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    const updatedProduct = product;
    updatedProduct = {
      ...product,
      ...changes
    }
    return updatedProduct;
  }

  async delete(id) {
    const product = this.findOne(id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;

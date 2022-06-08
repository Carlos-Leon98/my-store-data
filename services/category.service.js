const boom = require('@hapi/boom');

const { models } = require('../lib/sequelize')

const sequelize = require('../lib/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const newCategory = await models.Category.findAll();
    return newCategory;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    return category;
  }

  async update(id, changes) {
    const category = this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    const updatedCategory = category;
    updatedCategory = {
      ...category,
      ...changes
    }
    return updatedCategory;
  }

  async delete(id) {
    const category = this.findOne(id);
    if (!category) {
      throw boom.notFound('Category Not Found');
    }
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;

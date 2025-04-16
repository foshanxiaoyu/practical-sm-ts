const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // adjust the path to your sequelize instance

const GoodsCategory = sequelize.define('GoodsCategory', {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: 'Category name'
  },
  code: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: 'Category Code'
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
    comment: 'Category description'
  },
  category_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Category level',
    validate: {
      isIn: [[1, 2, 3]]
    }
  },
  is_tab: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Navigate or not'
  },
  add_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'Add time'
  }
}, {
  tableName: 'goods_categories',
  timestamps: false,
  comment: 'Product Category'
});

// Self-referencing association for parent category
GoodsCategory.belongsTo(GoodsCategory, {
  as: 'parent_category',
  foreignKey: {
    name: 'parentCategoryId',
    allowNull: true
  },
  onDelete: 'CASCADE'
});

GoodsCategory.hasMany(GoodsCategory, {
  as: 'sub_cat',
  foreignKey: 'parentCategoryId'
});

module.exports = GoodsCategory;

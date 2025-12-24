const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Restaurant = sequelize.define("Restaurant", {
  name: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
});

const MenuItem = sequelize.define("MenuItem", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

const Order = sequelize.define("Order", {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

// Associations
Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurantId" });

MenuItem.hasMany(Order, { foreignKey: "menuItemId" });
Order.belongsTo(MenuItem, { foreignKey: "menuItemId" });

module.exports = { Restaurant, MenuItem, Order };

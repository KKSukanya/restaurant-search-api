const { MenuItem, Restaurant, Order } = require("../db/models");
const { Sequelize } = require("sequelize");

const { sequelize } = require("../db/index");

const searchDishes = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    if (!name || !minPrice || !maxPrice) {
      return res.status(400).json({ error: "name, minPrice, maxPrice are required" });
    }

    const query = `
      SELECT 
        r.id AS "restaurantId",
        r.name AS "restaurantName",
        r.city,
        m.name AS "dishName",
        m.price AS "dishPrice",
        COALESCE(SUM(o.quantity), 0) AS "orderCount"
      FROM "MenuItems" m
      JOIN "Restaurants" r ON m."restaurantId" = r.id
      LEFT JOIN "Orders" o ON o."menuItemId" = m.id
      WHERE m.name ILIKE :dishName
        AND m.price BETWEEN :minPrice AND :maxPrice
      GROUP BY r.id, r.name, r.city, m.name, m.price
      ORDER BY "orderCount" DESC
      LIMIT 10;
    `;

    const results = await sequelize.query(query, {
      replacements: {
        dishName: `%${name}%`,
        minPrice: parseFloat(minPrice),
        maxPrice: parseFloat(maxPrice),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    res.json({ restaurants: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { searchDishes };

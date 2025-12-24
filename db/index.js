const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // allow self-signed certs
    },
  },
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { sequelize, testConnection };

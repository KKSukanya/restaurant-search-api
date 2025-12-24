const { sequelize } = require("./index");
const { Restaurant, MenuItem, Order } = require("./models");

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // reset tables

    // Create 11 Restaurants
    const restaurantsData = [
      { name: "Hyderabadi Spice House", city: "Hyderabad" },
      { name: "Biryani Lovers", city: "Bangalore" },
      { name: "Royal Biryani", city: "Delhi" },
      { name: "Paradise Biryani", city: "Hyderabad" },
      { name: "Biryani Hub", city: "Chennai" },
      { name: "Spice Biryani", city: "Mumbai" },
      { name: "Dum Biryani House", city: "Kolkata" },
      { name: "Shahi Biryani", city: "Lucknow" },
      { name: "Biryani Corner", city: "Pune" },
      { name: "Biryani Adda", city: "Bangalore" },
      { name: "Royal Spice Biryani", city: "Delhi" },
    ];

    const restaurants = [];
    for (const r of restaurantsData) {
      const restaurant = await Restaurant.create(r);
      restaurants.push(restaurant);
    }

    // Create Menu Items for each restaurant
    const menuItems = [];
    for (let i = 0; i < restaurants.length; i++) {
      // Each restaurant has Chicken Biryani and Veg Biryani with varying prices
      const dish1 = await MenuItem.create({
        name: "Chicken Biryani",
        price: 200 + i * 5, // Slightly different price for each
        restaurantId: restaurants[i].id,
      });
      const dish2 = await MenuItem.create({
        name: "Veg Biryani",
        price: 180 + i * 5,
        restaurantId: restaurants[i].id,
      });
      menuItems.push(dish1, dish2);
    }

    // Create Orders (random quantities for demonstration)
    const orders = [];
    menuItems.forEach((dish, index) => {
      // Only add orders for Chicken Biryani so that search results are meaningful
      if (dish.name === "Chicken Biryani") {
        const quantity = Math.floor(Math.random() * 50) + 10; // 10 to 59 orders
        orders.push({ menuItemId: dish.id, quantity });
      }
    });

    await Order.bulkCreate(orders);

    console.log("Database seeded successfully with 11 restaurants!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();

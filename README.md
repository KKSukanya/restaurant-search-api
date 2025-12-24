# Restaurant Search API

A RESTful API built with Node.js, Express, Sequelize, and PostgreSQL that allows searching restaurants by dish name and price range.

Live URL of Railway: https://restaurant-search-api-production-5250.up.railway.app/

#  Features
- Search restaurants by dish name
- Filter results by minimum and maximum price
- Uses PostgreSQL with Sequelize ORM
- Hosted on Railway.app

1. Run the Seed Script
In Railway, run:
node db/seed.js

This will:
Create tables (Restaurant, MenuItem, Order)
Insert sample restaurants and menu items
Add some orders



2. Railway Deployment:

Ensure Start Command is:-

node server.js

railway url:  https://restaurant-search-api-production-5250.up.railway.app/
Your deployed app will show:

Restaurant Search API is running! Use /search endpoint to query dishes.

so, sample API 

https://restaurant-search-api-production-5250.up.railway.app/search/dishes?name=biryani&minPrice=150&maxPrice=300

Example Response

[
  {
    "restaurant": "Biryani Lovers",
    "city": "Bangalore",
    "dish": "Chicken Biryani",
    "price": 200
  },
  ...
]




# ORM
## Homework 13 - E-Commerce Back End

Your purpose of this assignment is to build the back end for an e-commerce site by modifying starter code. We will configure a working Express.js API to use Sequelize to interact with a MySQL database. 

* The link to the video walkthrough can be found [here](https://drive.google.com/file/d/1D9dIf-WNXf8_SPyBBk4L2qEBiWTwTxaA/view).

<br />

# Acceptance criteria
## :heavy_check_mark: Use environment variable file to store sensitive data

```
./.env

DB_USER=xxxxx
DB_PW=xxxxxx
DB_NAME=xxxxxxx
```

```javascript

./config/connection.js

require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

```

## :heavy_check_mark: Connect to DB using Sequelize and ync with DB

```javascript
[nodemon] starting `node server.js`
Executing (default): CREATE TABLE IF NOT EXISTS `category` (`id` INTEGER NOT NULL auto_increment , `category_name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `category`
Executing (default): CREATE TABLE IF NOT EXISTS `product` (`id` INTEGER NOT NULL auto_increment , `product_name` VARCHAR(255) NOT NULL, `price` DECIMAL(10,2) NOT NULL, `stock` INTEGER NOT NULL DEFAULT 10, `category_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `product`
Executing (default): CREATE TABLE IF NOT EXISTS `tag` (`id` INTEGER NOT NULL auto_increment , `tag_name` VARCHAR(255), PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `tag`
Executing (default): CREATE TABLE IF NOT EXISTS `product_tag` (`id` INTEGER NOT NULL auto_increment , `product_id` INTEGER, `tag_id` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `product_tag`
App listening on port 3001!
```

## :heavy_check_mark: Schema and seeds

```sql
-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;
```

* SEED
```javascript
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  console.log('sequelize:', sequelize)
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
```

## :heavy_check_mark: Using Insomnia Core, you get API GET, PUT, POST, and DELETE routes for all categories, products and tags.

Please refer to the [walk-through video](https://drive.google.com/file/d/1D9dIf-WNXf8_SPyBBk4L2qEBiWTwTxaA/view)

## :heavy_check_mark: Modules used

* [mysql2](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [express](https://www.npmjs.com/package/express)
* [dotenv](https://www.npmjs.com/package/dotenv)





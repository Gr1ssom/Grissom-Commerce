# E-commerce Back End

## Description

This is the back end for an e-commerce site. It uses Node.js, Express.js, and Sequelize to interact with a MySQL database.

## Installation

1. Clone the repository.
2. Run `npm install` to install the necessary dependencies.
3. Change the credentials on line 7 of the "connection.js" that says "your_username" and "your_password" to allow the application to log in.
4. Open MySQL shell and run the following command to create the database: `source db/schema.sql`
5. Seed the database by running the following command: `npm run seed`
6. Start the server by running `npm start` or `node server.js`.

## Usage

The API endpoints can be tested in Insomnia. The available endpoints are:

### Categories

* GET all categories: `/api/categories`
* GET a single category by id: `/api/categories/:id`
* POST a new category: `/api/categories`
* PUT update a category by id: `/api/categories/:id`
* DELETE a category by id: `/api/categories/:id`

### Products

* GET all products: `/api/products`
* GET a single product by id: `/api/products/:id`
* POST a new product: `/api/products`
* PUT update a product by id: `/api/products/:id`
* DELETE a product by id: `/api/products/:id`

### Tags

* GET all tags: `/api/tags`
* GET a single tag by id: `/api/tags/:id`
* POST a new tag: `/api/tags`
* PUT update a tag by id: `/api/tags/:id`
* DELETE a tag by id: `/api/tags/:id`

## Credits

This project was created by Dylan Grissom.

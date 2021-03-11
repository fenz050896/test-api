require('dotenv').config();

const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASS;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
  logging: false,
});


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Test API',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express..',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Test',
      url: 'https://test.test',
    },
  },
  servers: [
    {
      url: 'http://localhost:3478',
      description: 'Development server',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./index.js'],
};
const swaggerSpec = swaggerJSDoc(options);


const app = express();
const models = require('./database/models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer 
 *                  name:
 *                    type: string
 *                  dob:
 *                    type: string
 *                  address:
 *                    type: string
 *                  description:
 *                    type: string
 *                  createdAt:
 *                    type: string
 * 
 */
app.get('/users', async (req, res) => {
  const u = await models.User.findAll();
  res.status(200).send(u);
});

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Retrieve a user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the user to get
 *     description: Retrieve a user by id.
 *     responses:
 *       200:
 *         description: Get an user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer 
 *                  name:
 *                    type: string
 *                  dob:
 *                    type: string
 *                  address:
 *                    type: string
 *                  description:
 *                    type: string
 *                  createdAt:
 *                    type: string
 * 
 */
app.get('/users/:id', async (req, res) => {
  const u = await models.User.findByPk(+req.params.id);
  res.status(200).send(u);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Insert a user
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: User name
 *      - in: path
 *        name: dob
 *        schema:
 *          type: date
 *        required: false
 *        description: user date of birth
 *      - in: path
 *        name: address
 *        schema:
 *          type: string
 *        required: false
 *        description: user address
 *      - in: path
 *        name: description
 *        schema:
 *          type: string
 *        required: false
 *        description: user description
 *     description: Insert a user.
 *     responses:
 *       201:
 *         description: Insert new user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *         description: Insert new user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 * 
 */
app.post('/users', async (req, res) => {
  try {
    const u = await models.User.create(req.body);
    if (!u) throw new Error('error');

    res.status(201).send({ message: 'Success OK' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/**
 * @swagger
 * /users/:id:
 *   put:
 *     summary: Edit a user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: User id
 *     description: Edit a user by id.
 *     responses:
 *       204:
 *       500:
 *         description: Edit a user by id.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 * 
 */
app.put('/users/:id', async (req, res) => {
  try {
    const u = await models.User.update(req.body, {
      where: { id: +req.params.id }
    });
    if (!u) throw new Error('error');

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: User id
 *     description: Delete a user.
 *     responses:
 *       200:
 *         description: Delete a user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *       500:
 *         description: Delete a user.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 * 
 */
app.delete('/users/:id', async (req, res) => {
  try {
    const u = await models.User.destroy({
      where: { id: +req.params.id }
    });
    if (!u) throw new Error('error');

    res.status(200).send({ message: 'Success OK' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen('3478', '0.0.0.0', () => {
  console.log('RUNNING on port 3478');
});

module.exports = app;

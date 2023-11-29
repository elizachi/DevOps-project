import type { Auth } from '@entities/auth.js';
import type { Expenses } from '@entities/expenses.js';
import type { Categories } from '@entities/categories.js';
import type { Report } from '@entities/report.js';
import { User } from '@entities/user.js';
import { StatusCodes } from 'http-status-codes';
import { FastifyReply, FastifyRequest } from 'fastify';


/**
 * Connect server to port
 */
const fastify = require('fastify')();

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
});

/**
 * Connect to database
 */
fastify.register(require('@fastify/postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
});

/**
 * API routes
 * Route for init data base
 */
fastify.get('/init_data_base', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

  fastify.pg.query(
    'CREATE TABLE IF NOT EXIST users (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL,' +
    'login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, categories ENUM, reports(255)',
    function onResult (result) {
      console.log(result);
      reply.status(200).send({message: 'Success!'});
    }
  );
});

/**
 * Registration
 */
fastify.post('/api/register', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

  const reg = request.body as Auth;

  /**
   * If any of the fields are empty
   */
  if(!reg.login || !reg.password || !reg.passwordRep) {
    return reply
    .status(400)
    .send({message: 'All fields must be filled in'});
  }

  /**
   * Сheck if the correct password has been entered twice
   */
  if(reg.password !== reg.passwordRep) {
    return reply
    .status(400)
    .send({message: 'Passwords do not match'});
  }

  /**
   * Check if user already exist
   */
  fastify.pg.query(
    `SELECT * FROM users WHERE login = ${reg.login} AND password = ${reg.password};`,
    function onResult (err, result) {
      console.log(result);

      if(result !== null && result !== undefined) {
        reply
        .status(409)
        .send({message: 'User already exist'})
      }
    }
  );

  /**
   * If everything is alright create new user with login and password
   */
  fastify.pg.query(
    `INSERT INTO users (login, password) VALUES (${reg.login}, '${reg.password}')`,
    function onResult (err, result) {
      console.log(result);

      return reply
      .status(200)
      .send({message: 'Success!'});
    }
  );
});

/**
 * Authtorization
 */
fastify.post('/api/login', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

    const auth = request.body as Auth;

    /**
     * If any of the fields are empty
     */
    if(!auth.login || !auth.password || !auth.passwordRep) {
      return reply
      .status(400)
      .send({message: 'All fields must be filled in'});
    }
  
    /**
     * Check password in database
     */
    fastify.pg.query(
      `SELECT * FROM users WHERE login = ${auth.login} AND password = ${auth.password};`,
      function onResult (err, result) {
        console.log(result);

        if(result === null || result === undefined) {
          reply
          .status(401)
          .send({message: 'Uncorrect login or password'})
        }
      }
    );
  
    return reply
    .status(200)
    .send({message: 'Success!'});
});

/**
 * Categories
 */
fastify.get('/api/categories', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

  return reply
  .status(200)
  .send({message: 'Success!'});
});

/**
 * Expenses
 */
fastify.get('/api/expenses/:id', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

    const exp = request.body as User;

    /**
     * If any of the fields are empty
     */
    if(!exp.uid) {
      return reply
      .status(400)
      .send({message: 'Field must be filled in'});
    }

    /**
     * Check user id in database
     */
    fastify.pg.query(
      `SELECT * FROM users WHERE id = ${exp.uid};`,
      function onResult (err, result) {
        console.log(result);

        if(result === null || result === undefined) {
          reply
          .status(404)
          .send({message: `User with id = ${exp.uid} not found`})
        }
      }
    );

    return reply
    .status(200)
    .send({message: 'Success!'});

});

fastify.post('/api/expenses', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {

    const exp = request.body as Expenses;

  /**
   * If any of the fields are empty
   */
  if(!exp.id || !exp.amount || !exp.date) {
    return reply
    .status(400)
    .send({message: 'Id, amount and date fields must be filled in'});
  }

  /**
     * Check category in database
     */
  fastify.pg.query(
    `SELECT * FROM users WHERE id = ${exp.category};`,
    function onResult (err, result) {
      console.log(result);

      if(result === null || result === undefined) {
        reply
        .status(400)
        .send({message: 'No such category'})
      }
    }
  );

  /**
     * Check user id in database
     */
  fastify.pg.query(
    `SELECT * FROM users WHERE id = ${exp.id};`,
    function onResult (err, result) {
      console.log(result);

      if(result === null || result === undefined) {
        reply
        .status(404)
        .send({message: `User with id = ${exp.id} not found`})
      }
    }
  );

  return reply
  .status(200)
  .send({message: 'Success!'});

});

fastify.get('/api/reports/:id', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {
    const usr = request.params as User;

    /**
     * If any of the fields are empty
     */
    if(!usr.uid) {
      return reply
      .status(400)
      .send({message: 'Field must be filled in'});
    }

    /**
     * Check user id in database
     */
    fastify.pg.query(
      `SELECT * FROM users WHERE id = ${usr.uid};`,
      function onResult (err, result) {
        console.log(result);

        if(result === null || result === undefined) {
          reply
          .status(404)
          .send({message: `User with id = ${usr.uid} not found`})
        }
      }
    );

    return reply
    .status(200)
    .send({message: 'Success!'});
});

fastify.get('/api/reports/:user_id/:report_id', async (
  request: FastifyRequest, reply: FastifyReply
  ) => {
    const usr = request.params as User;
    /**
     * Check user id in database
     */
    fastify.pg.query(
      `SELECT * FROM users WHERE id = ${usr.uid};`,
      function onResult (err, result) {
        console.log(result);

        if(result === null || result === undefined) {
          reply
          .status(404)
          .send({message: `User with id = ${usr.uid} not found`})
        }
      }
    );

    return reply
    .status(200)
    .send({message: 'Success!'});
    
});

fastify.post('/api/reports/:user_id', async (
  request: FastifyRequest, reply: FastifyReply
    ) => {

    const usr = request.params as User;
 
    /**
     * Check user id in database
     */
    fastify.pg.query(
      `SELECT * FROM users WHERE id = ${usr.uid};`,
      function onResult (err, result) {
        console.log(result);

        if(result === null || result === undefined) {
          reply
          .status(404)
          .send({message: `User with id = ${usr.uid} not found`})
        }
      }
    );

    return reply
    .status(200)
    .send({message: 'Success!'});
});
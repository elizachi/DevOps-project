import type { Auth } from '@entities/auth.js';
import type { Expenses } from '@entities/expenses.js';
import type { Categories } from '@entities/categories.js';
import type { Report } from '@entities/report.js';
import { User } from '@entities/user.js';
import { StatusCodes } from 'http-status-codes';
import { FastifyReply, FastifyRequest } from 'fastify';

const fastify = require('fastify');

const server = fastify({
    logger:true
});

server
  .listen(3002)
  .catch(console.error);

module.exports = { server };

/**
 * Registration
 */
server.post('/api/register', async (
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
   * @todo check whether such a user already exists
   */

  return reply
  .status(200)
  .send({message: 'Success!'});
});

/**
 * Authtorization
 */
server.post('/api/login', async (
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
     * @todo incorrect password
     */
  
    return reply
    .status(200)
    .send({message: 'Success!'});
});

/**
 * Categories
 */
server.get('/api/categories', async (
  reply: FastifyReply
  ) => {

  return reply
  .status(200)
  .send({message: 'Success!'});
});

/**
 * Expenses
 */
server.get('/api/expenses/:id', async (
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
     * @todo check user id in database
     */

    /**
     * @todo permission denied
     */

    return reply
    .status(200)
    .send({message: 'Success!'});

});

server.post('/api/expenses', async (
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
   * @todo search category by uid
   */

  /**
   * @todo check user id in db
   */

  /**
   * @todo permission denied
   */

  return reply
  .status(200)
  .send({message: 'Success!'});

});

server.get('/api/reports/:id', async (
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
     * @todo check user id in database
     */

    /**
     * @todo permission denied
     */

    return reply
    .status(200)
    .send({message: 'Success!'});
});

server.get('/api/reports/:user_id/:report_id', async (
  reply: FastifyReply
  ) => {

    /**
     * @todo check user and report id in database
     */

    /**
     * @todo permission denied
     */

    return reply
    .status(200)
    .send({message: 'Success!'});
    
});

server.post('/api/reports/:user_id', async (
  reply: FastifyReply
    ) => {
    /**
     * @todo check user and report id in database
     */

    /**
     * @todo permission denied
     */

    return reply
    .status(200)
    .send({message: 'Success!'});
});
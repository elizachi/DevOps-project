"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify = require('fastify');
const server = fastify({
    logger: true
});
server
    .listen(3000)
    .catch(console.error);
module.exports = { server };
/**
 * Registration
 */
server.post('/api/register', async (request, reply) => {
    const reg = request.body;
    /**
     * If any of the fields are empty
     */
    if (!reg.login || !reg.password || !reg.passwordRep) {
        return reply
            .status(400)
            .send({ message: 'All fields must be filled in' });
    }
    /**
     * Сheck if the correct password has been entered twice
     */
    if (reg.password !== reg.passwordRep) {
        return reply
            .status(400)
            .send({ message: 'Passwords do not match' });
    }
    /**
     * @todo check whether such a user already exists
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
/**
 * Authtorization
 */
server.post('/api/login', async (request, reply) => {
    const auth = request.body;
    /**
     * If any of the fields are empty
     */
    if (!auth.login || !auth.password || !auth.passwordRep) {
        return reply
            .status(400)
            .send({ message: 'All fields must be filled in' });
    }
    /**
     * @todo incorrect password
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
/**
 * Categories
 */
server.get('/api/categories', async (reply) => {
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
/**
 * Expenses
 */
server.get('/api/expenses/:id', async (request, reply) => {
    const exp = request.body;
    /**
     * If any of the fields are empty
     */
    if (!exp.uid) {
        return reply
            .status(400)
            .send({ message: 'Field must be filled in' });
    }
    /**
     * @todo check user id in database
     */
    /**
     * @todo permission denied
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
server.post('/api/expenses', async (request, reply) => {
    const exp = request.body;
    /**
     * If any of the fields are empty
     */
    if (!exp.id || !exp.amount || !exp.date) {
        return reply
            .status(400)
            .send({ message: 'Id, amount and date fields must be filled in' });
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
        .send({ message: 'Success!' });
});
server.get('/api/reports/:id', async (request, reply) => {
    const usr = request.params;
    /**
     * If any of the fields are empty
     */
    if (!usr.uid) {
        return reply
            .status(400)
            .send({ message: 'Field must be filled in' });
    }
    /**
     * @todo check user id in database
     */
    /**
     * @todo permission denied
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
server.get('/api/reports/:user_id/:report_id', async (reply) => {
    /**
     * @todo check user and report id in database
     */
    /**
     * @todo permission denied
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});
server.post('/api/reports/:user_id', async (reply) => {
    /**
     * @todo check user and report id in database
     */
    /**
     * @todo permission denied
     */
    return reply
        .status(200)
        .send({ message: 'Success!' });
});

const { getAll, create, getOne, remove, update, login, getMe, setPosts } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create);

routerUser.route('/login') // ! /users/login
    .post(login)

routerUser.route('/me')
    .get(verifyJwt, getMe)

routerUser.route('/:id/post')
    .post(setPosts)

routerUser.route('/:id')
    .get(verifyJwt, getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerUser;
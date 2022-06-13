'use steict';

const express = require('express');
const bcrypt = require('bcrypt');

const {users} = require('../auth/models/users-model');
const signUpRouter = express.Router();

signUpRouter.post('/signup', async (req, res) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body);
        res.status(201).json(record);
    } catch (e) {
        res.status(201).send('Error Creating User');
    }
});

module.exports = signUpRouter;
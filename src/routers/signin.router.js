'use steict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { users } = require('../auth/models/users-model');
const signInRouter = express.Router();
const basicAuth = require('../auth/middleware/basic');


signInRouter.post('/signin', basicAuth, async (req, res) => {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encoded = basicHeaderParts[1];
    let decoded = base64.decode(encoded);
    let [username, password] = decoded.split(':');
    try {
        const user = await users.findOne({
            where: {
                username: username
            }
        });
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            res.status(200).json({
                message: 'Successfully signed in',
                user: `The user ${user.username}`,
            });
        }
    } catch (e) {
        res.status(403).send('Invalid Login');
    }
});

module.exports = signInRouter;
"use strict"; // to use javascript in strict mode
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();


const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");
const signinRouter = require('./routers/signin.router');
const signupRouter = require('./routers/signup.router');

app.use(express.json());

app.use(signinRouter);
app.use(signupRouter);

app.get("/", (req, res) => {
    res.status(200).send('welcome to my app');
});

app.use("*", notFoundHandler);

app.use(errorHandler);

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start
};
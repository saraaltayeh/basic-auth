"use strict";
const {app} = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

const {db} = require('../src/auth/models/index.model');
const basicAuth = require("../src/auth/middleware/basic");

beforeAll(async () => {
    await db.sync();
});

describe('web server', () => {
    it('it should create a new user', async () => {
        const response = await request.post('/signup').send({
            "username": "sara altayeh",
            "password": "sara123"
        })
        expect(response.status).toBe(201);
    });
});

afterAll(async () => {
    await db.drop();
});
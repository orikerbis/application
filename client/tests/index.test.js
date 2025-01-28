// tests/index.test.js
const request = require('supertest');
const app = require('../index'); // Import the Express app

describe('GET /', () => {
  it('should respond with 200 OK and display apple count', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Number of apples in DB:');
  });
});
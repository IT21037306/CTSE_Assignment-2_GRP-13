const supertest = require('supertest');
const app = require('../index.js');
const connectDB = require('../config/db.js');
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  mongoose.connection.close();
});

// Test case for adding a new review
describe('Review Routes', () => {
  describe('POST /api/review/add', () => {
    test('Add new review', async () => {
      const mockReview = {
        productId: '66334f5901f79ae4d64d8ed3',
        name: 'John Doe - Test',
        rating: 5,
        comment: 'Great product! - Test',
      };

      const res = await supertest(app).post('/api/review/add').send(mockReview);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.productId).toBe(mockReview.productId);
      expect(res.body.name).toBe(mockReview.name);
      expect(res.body.rating).toBe(mockReview.rating);
      expect(res.body.comment).toBe(mockReview.comment);
    });
  });

  // Test case for getting all reviews
  describe('GET /api/review/get', () => {
    test('Get all reviews', async () => {
      const res = await supertest(app).get('/api/review/get');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});

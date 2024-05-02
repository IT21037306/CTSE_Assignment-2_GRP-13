const supertest = require("supertest");
const app = require("../index.js");
const connectDB = require("../config/db.js");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  mongoose.connection.close();
});

// test case for add product
describe("ADD Product /api/Product", () => {
  test("Add new product : POST /api/product/add", async () => {
    const res = await supertest(app).post("/api/product/add").send({
      name: "Test Product 1",
      price: 100,
      quantity: 10,
      description: "Test Product 1 description",
      category: "Test Category 1",
    });
    expect(res.statusCode).toBe(201);
  });
});

// test case for update product
describe("UPDATE Product /api/Product", () => {
  test("Update product : PUT /api/product/update/:id", async () => {
    const res = await supertest(app)
      .put("/api/product/update/66334f5901f79ae4d64d8ed3")
      .send({
        name: "Updated Test Product 1",
        price: 200,
        quantity: 20,
        description: "Updated Test Product 1 description",
        category: "Updated Test Category 1",
      });
    expect(res.statusCode).toBe(200);
  });
});

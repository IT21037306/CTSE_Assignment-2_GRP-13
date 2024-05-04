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
      .put("/api/product/update/66346d7fbc4e4d22ed21779e")
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

// test case for get all products
describe("GET All Products /api/Product", () => {
  test("Get all products : GET /api/product", async () => {
    const res = await supertest(app).get("/api/product");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("price");
    expect(res.body[0]).toHaveProperty("quantity");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("category");
  });
});

// test case for get product by ID
describe("GET Product by ID /api/Product", () => {
  test("Get product by ID : GET /api/product/:id", async () => {
    const res = await supertest(app).get(
      "/api/product/661fb21218cd5e66bf77cb62"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Samsung Galaxy S24 Ultra");
    expect(res.body).toHaveProperty("price", 3000);
    expect(res.body).toHaveProperty("quantity", 555);
    expect(res.body).toHaveProperty("description", "sadsadasdasdasdas");
    expect(res.body).toHaveProperty("category", "Communication");
  });

  test("Return 404 for non-existent product ID", async () => {
    const res = await supertest(app).get(
      "/api/product/441fb21218cd5e66bf77cb62"
    );
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Product not found");
  });
});

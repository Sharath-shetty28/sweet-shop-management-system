// src/tests/sweet.test.js
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/user.js";
import Sweet from "../models/sweet.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const api = request(app);

let userToken;
let adminToken;
let sweetId;

beforeAll(async () => {
  // Connect to test DB (ensure MONGO_URI_TEST exists in .env)
  await mongoose.connect(process.env.MONGO_URI);

  // Create user and admin directly
  await User.deleteMany({});
  const user = await User.create({
    name: "User",
    email: "user@test.com",
    password: "pass1234",
  });
  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: "pass1234",
    role: "admin",
  });

  userToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  adminToken = jwt.sign(
    { id: admin._p?._id ?? admin._id, role: admin.role },
    process.env.JWT_SECRET
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweets API (Protected)", () => {
  test("POST /api/sweets - user can add a sweet (should be protected but allowed for admin only? adjust rule)", async () => {
    // In our design, adding sweets is admin-only. This test checks admin can add.
    const res = await api
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Classic",
        price: 30,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Gulab Jamun");
    sweetId = res.body._id;
  });

  test("GET /api/sweets - anyone can list sweets", async () => {
    const res = await api.get("/api/sweets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("GET /api/sweets/search - search by name", async () => {
    const res = await api.get("/api/sweets/search").query({ q: "Gulab" });
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("PUT /api/sweets/:id - admin can update sweet", async () => {
    const res = await api
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 35 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(35);
  });

  test("POST /api/sweets/:id/purchase - user can purchase (quantity decreases)", async () => {
    // purchase 2 items
    const res = await api
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ qty: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("remainingQuantity");
    expect(res.body.remainingQuantity).toBe(48);
  });

  test("POST /api/sweets/:id/restock - admin can restock (quantity increases)", async () => {
    const res = await api
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ qty: 10 });

    expect(res.status).toBe(200);
    expect(res.body.newQuantity).toBe(58);
  });

  test("DELETE /api/sweets/:id - admin can delete sweet", async () => {
    const res = await api
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  test("Protected routes reject missing/invalid token", async () => {
    const res = await api
      .post(`/api/sweets/${sweetId}/purchase`)
      .send({ qty: 1 });
    expect(res.status).toBe(401);
  });
});

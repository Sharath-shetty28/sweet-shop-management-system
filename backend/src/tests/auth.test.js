import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

describe("Auth API", () => {
  afterAll(async () => {
    await mongoose.connection.close(); // cleanup
  });

  test("should register a user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Sharath",
      email: "sharath@test.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
  });

  test("should login a user successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "sharath@test.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
  });
});

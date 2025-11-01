import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  test("should register a user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Sharath",
      email: "sharath@test.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("should login a user successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "sharath@test.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it
} from "vitest";

import request from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/lib/prisma.js";
import { repoCreateUserToken } from "../helpers/auth.js";

describe("Task API", () => {

  beforeEach(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create a task", async () => {
    const token = await repoCreateUserToken();
    
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test API",
        description: "Testing HTTP request"
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test API");
    expect(response.body.description).toBe("Testing HTTP request");
    expect(response.body.completed).toBe(false);
  });

  it("should return all tasks", async () => {
    const token = await repoCreateUserToken();

    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task 1"
      });

    await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task 2"
      });

    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should reject invalid task data", async () => {
    const token = await repoCreateUserToken();
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: 123
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Validation error");
  });

  it("should return 404 when task does not exist", async () => {
    const token = await repoCreateUserToken();
    const response = await request(app)
      .get("/tasks/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Resource not found");
  });

  it("should update a task", async () => {
    const token = await repoCreateUserToken();
    const created = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Original title"
      });

    const response = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated title",
        completed: true
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated title");
    expect(response.body.completed).toBe(true);
  });

  it("should delete a task", async () => {
    const token = await repoCreateUserToken()
    const created = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Delete me"
      });

    const response = await request(app)
      .delete(`/tasks/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

});
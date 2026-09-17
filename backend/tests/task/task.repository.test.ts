import { beforeEach, afterEach, describe, expect, it } from "vitest";

import { prisma } from "../../src/lib/prisma.js";

import {
  createTask,
  getTaskId,
  getAllTasks,
  updateTask,
  deleteTask
} from "../../src/repositories/task.repository.js";

import { createUserTest } from "../helpers/auth.js";

describe("Task Repository", () => {
  beforeEach(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create a task", async () => {
    const email = "edwar@gmail.com";
    const password = "123456789";

    const user = await createUserTest(email, password);

    const task = await createTask(
      {
        title: "Test task",
        description: "Testing repository"
      },
      Number(user?.id)
    );

    expect(task.title).toBe("Test task");
    expect(task.description).toBe("Testing repository");
    expect(task.completed).toBe(false);
    expect(task.userId).toBe(user?.id);
  });

  it("should find a task by id", async () => {
    const email = "edwar@gmail.com";
    const password = "123456789";

    const user = await createUserTest(email, password);

    const createdTask = await createTask(
      {
        title: "Find me"
      },
      Number(user?.id)
    );

    const task = await getTaskId(
      createdTask.id,
      Number(user?.id)
    );

    expect(task).not.toBeNull();
    expect(task?.title).toBe("Find me");
    expect(task?.userId).toBe(user?.id);
  });

  it("should return all tasks", async () => {
    const email = "edwar@gmail.com";
    const password = "123456789";

    const user = await createUserTest(email, password);

    const tasks = await getAllTasks(Number(user?.id));

    expect(tasks).toBeInstanceOf(Array);
  });

  it("should update a task", async () => {
    const email = "edwar@gmail.com";
    const password = "123456789";

    const user = await createUserTest(email, password);

    const createdTask = await createTask(
      {
        title: "Original title"
      },
      Number(user?.id)
    );

    const updatedTask = await updateTask(
      createdTask.id,
      {
        title: "Updated title",
        completed: true
      },
      createdTask.userId
    );

    expect(updatedTask.title).toBe("Updated title");
    expect(updatedTask.completed).toBe(true);
  });

  it("should delete a task", async () => {
    const email = "edwar@gmail.com";
    const password = "123456789";

    const user = await createUserTest(email, password);

    const createdTask = await createTask(
      {
        title: "Delete me"
      },
      Number(user?.id)
    );

    const deletedTask = await deleteTask(
      createdTask.id,
      createdTask.userId
    );

    expect(deletedTask.id).toBe(createdTask.id);

    const task = await getTaskId(
      createdTask.id,
      createdTask.userId
    );

    expect(task).toBeNull();
  });
});
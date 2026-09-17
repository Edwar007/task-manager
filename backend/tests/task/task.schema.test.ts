import { describe, expect, it } from "vitest";
import { createTaskSchema, updateTaskSchema } from "../../src/schemas/task.schema.js";

describe("createTaskSchema", () => {

  it("should accept a valid task", () => {
    const data = {
      title: "Aprender testing",
      description: "Aprender Vitest"
    };

    const result = createTaskSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("should accept a task without description", () => {
    const data = {
      title: "Aprender testing"
    };

    const result = createTaskSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("should reject a task with an invalid title", () => {
    const data = {
      title: 123
    };

    const result = createTaskSchema.safeParse(data);

    expect(result.success).toBe(false);
  });

});

describe("updateTaskSchema", () => {

  it("should accept a completed task", () => {
    const data = {
      completed: true
    };

    const result = updateTaskSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

  it("should accept an empty update", () => {
    const data = {};

    const result = updateTaskSchema.safeParse(data);

    expect(result.success).toBe(true);
  });

});
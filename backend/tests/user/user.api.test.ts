import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/lib/prisma.js";
import { apiCreateUserToken } from "../helpers/auth.js";
import { loginService } from "../../src/services/user.service.js";

describe("Crear Usuarios API", () => {

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("Debería crear un usuario", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "edwar@email.com",
        password: "12345678"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", "edwar@email.com");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    // La contraseña nunca debe devolverse
    expect(response.body).not.toHaveProperty("password");
  });

  it("No debería crear un usuario con email inválido", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "edwaremail.com",
        password: "12345678"
      });

    expect(response.status).toBe(400);
  });

  it("No debería crear un usuario con contraseña menor a 8 caracteres", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        email: "edwar@email.com",
        password: "1234567"
      });

    expect(response.status).toBe(400);
  });

  it("No debería permitir dos usuarios con el mismo email", async () => {

    await request(app)
      .post("/users")
      .send({
        email: "edwar@email.com",
        password: "12345678"
      });

    const response = await request(app)
      .post("/users")
      .send({
        email: "edwar@email.com",
        password: "87654321"
      });

    expect(response.status).toBe(409);
  });
});


describe("Obtener Usuarios API", () => {

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("Debería obtener todos los usuarios", async () => {
    const email = "edwar1@gmail.com";
    const password = "123456789";
    const token = await apiCreateUserToken(email, password);

    await request(app)
      .post("/users")
      .send({
        email: "edwar2@gmail.com",
        password: "123456789"
      });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.body[1]).not.toHaveProperty("password");
  });

  
  it("Debería obtener un usuario por ID", async () => {

    const email = "edwar1@gmail.com";
    const password = "123456789";
    const createResponse = await request(app)
      .post("/users")
      .send({
        email,
        password
      });

    const id = createResponse.body.id;
    const token = await loginService({email, password});

    const response = await request(app)
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("email", email );
    expect(response.body).not.toHaveProperty("password");
  });


  it("Debería devolver 404 si el usuario no existe", async () => {

    const email = "edwar1@gmail.com";
    const password = "123456789";
    const token = await apiCreateUserToken(email, password);
    const response = await request(app)
      .get("/users/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "Forbidden"
    });
  });
});

describe("Actualizar Usuarios API", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

   it("Debería actualizar un usuario", async () => {

    const email = "edwar1@gmail.com";
    const password = "123456789";
    const createResponse = await request(app)
      .post("/users")
      .send({
        email,
        password
      });

    console.log(createResponse)
    const id = createResponse.body.id;
    const token = await loginService({email, password});
    const response = await request(app)
      .put(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "edwar2@gmail.com",
        password: "8765432123"
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", "edwar2@gmail.com");
    expect(response.body).not.toHaveProperty("password");
  });
});

 


  // ─────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────

  it("Debería eliminar un usuario", async () => {

    const createResponse = await request(app)
      .post("/users")
      .send({
        email: "edwar@email.com",
        password: "12345678"
      });

    const id = createResponse.body.id;

    const response = await request(app)
      .delete(`/users/${id}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });


  it("Debería devolver 404 al eliminar un usuario inexistente", async () => {

    const response = await request(app)
      .delete("/users/9999");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      error: "Resource not found"
    });
  });




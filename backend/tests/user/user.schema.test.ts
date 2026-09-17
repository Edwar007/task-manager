import { beforeEach, afterEach, describe, expect, it } from "vitest";
import {createUserSchema, updateUserSchema} from "../../src/schemas/user.schema.js";
import { prisma } from "../../src/lib/prisma.js";
import { apiCreateUserToken } from "../helpers/auth.js";



describe("createUserSchema", () =>{

    beforeEach(async () => {
        await prisma.task.deleteMany();
        await prisma.user.deleteMany();
    });

    afterEach(async () => {
        await prisma.task.deleteMany();
        await prisma.user.deleteMany();
    });

    //Aceptar usuario valido 
    it("should accept a valid user", () =>{
        const data = {
            email: "edwar@email.com",
            password: "123455555"
        }

        const result = createUserSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    //no aceptar usuario invalido 
    it("should reject an user ivvalid", () =>{
        const data = {
            email: "edwaremail.com",
            password: "123455555"
        }

        const result = createUserSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    //no aceptar clave invalida 
    it("should reject a password ivvalid", () =>{
        const data = {
            email: "edwar@email.com",
            password: "12345"
        }

        const result = createUserSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});

describe("updateUserSchema", () => {
    it("should accept a password valid", () => {
        const data = {
            email: "edwar@email.com",
            password: "12345678"
        };

        const result = updateUserSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it("should not accept a password valid", () => {
        const data = {
            email: "edwar@email.com",
            password: "12345"
        };
        const result = updateUserSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
})
import {z} from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export const updateUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const createLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});


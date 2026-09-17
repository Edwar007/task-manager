import {createLoginSchema, createUserSchema, updateUserSchema} from "../schemas/user.schema.js";
import { z } from "zod";

export type userDTO = {
    id: number,
    email: string,
    createdAt: Date,
    updatedAt: Date
};

export type loginDTO = {
    id: number,
    email: string,
    password: string
};

export type LoginResponseDTO = {
  token: string;
};

export type createLoginDTO = z.infer<typeof createLoginSchema>;
export type createUserDTO = z.infer<typeof createUserSchema>;
export type updateUserDTO = z.infer<typeof updateUserSchema>;
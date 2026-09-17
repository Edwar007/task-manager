import { AppError } from "../errors/app.error.js";
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserId, updateUser } from "../repositories/user.repository.js";
import {  createLoginDTO, createUserDTO, updateUserDTO, userDTO } from "../types/user.types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const getUserIdService = (id: number): Promise<userDTO | null> => {
    return getUserId(id);
};

export const getAllUsersService = (): Promise<userDTO[] | null> =>{
    return getAllUsers();   
};

export const createUserService = async (data: createUserDTO): Promise<userDTO> => {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return createUser({
            ...data,
            password: hashedPassword
        });
};

export const updateUserService = async (id: number, data:updateUserDTO): Promise<userDTO> => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return updateUser(id,{
        ...data,
        password: hashedPassword
    });
};

export const deleteUserService = (id: number) =>{
    return deleteUser(id);
};

export const loginService = async (data: createLoginDTO) => {
    const user = await getUserByEmail(data.email);
    if(!user){
        throw new AppError("Invalid credentials", 401);
    }

    const passwordValid = await bcrypt.compare(
        data.password,
        user.password
    );

    if(!passwordValid){
        console.log(data.password);
        console.log(user.password);
        throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user.id);

    return token;
};

export const passwordChangeService = async (data:updateUserDTO): Promise<userDTO> => {
    const user = await getUserByEmail(data.email);
    if(!user){
        throw new AppError("Invalid credentials", 401);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return updateUser(user.id,{
        ...data,
        password: hashedPassword
    });
};

export const generateToken = (userId: number) => {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "1h" } );
};
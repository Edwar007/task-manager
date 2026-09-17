import { prisma } from "../lib/prisma.js";
import { loginDTO, createUserDTO, updateUserDTO, userDTO } from "../types/user.types.js";


export const getUserId = (id: number): Promise<userDTO | null> => {
    return prisma.user.findUnique({
        where: {
            id
        }, 

        select: {
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true
        }
    });
};

export const getAllUsers = (): Promise<userDTO[] | null> =>{
    return prisma.user.findMany({
        select: {
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true
        }
    });
};

export const getUserByEmail = (email: string): Promise<loginDTO | null>=>{
    return prisma.user.findUnique({
        where:{
            email
        },
        select:{
            id:true,
            email:true,
            password:true
        }
    });
};

export const createUser = (data: createUserDTO): Promise<userDTO> => {
    return prisma.user.create({
        data:{
            email: data.email,
            password: data.password
        },

        select: {
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true
        }
    });
};

export const updateUser = (id: number, data:updateUserDTO): Promise<userDTO> => {
    return prisma.user.update({
        where:{
            id
        },
        data:{
            email: data.email,
            password: data.password
        },
        select: {
            id:true,
            email:true,
            createdAt:true,
            updatedAt:true
        }
    });
};

export const deleteUser = (id: number) =>{
    return prisma.user.delete({
        where:{
            id
        }
    });
};
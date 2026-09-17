import { prisma } from "../lib/prisma.js";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";

export const getTaskId = (id: number, userId:number): Promise<TaskDTO | null> => {
  return prisma.task.findUnique({
    where: {
      id,
      userId
    }
  });
};

export const getAllTasks = (userId: number): Promise<TaskDTO[]> => {
  return prisma.task.findMany({
    where:{
      userId
    }
  });
};

export const createTask = (data: CreateTaskDTO, userId: number): Promise<TaskDTO>  => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      userId
    }
  });
};

export const updateTask = (id:number, data:UpdateTaskDTO, userId: number): Promise<TaskDTO>  =>{
  return prisma.task.update({
    where:{
      id,
      userId
    },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.completed !== undefined && { completed: data.completed })
    }
  });
};

export const deleteTask =(id:number,  userId: number) => {
  return prisma.task.delete({
    where: {
      id,
      userId
    }
  });
};
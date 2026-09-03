import { prisma } from "../lib/prisma.js";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";

export const getTaskId = (id: number): Promise<TaskDTO | null> => {
  return prisma.task.findUnique({
    where: {
      id
    }
  });
};

export const getAllTasks = (): Promise<TaskDTO[]> => {
  return prisma.task.findMany();
};

export const createTask = (data: CreateTaskDTO): Promise<TaskDTO>  => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description
    }
  });
};

export const updateTask = (id:number, data:UpdateTaskDTO): Promise<TaskDTO>  =>{
  return prisma.task.update({
    where:{
      id
    },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.completed !== undefined && { completed: data.completed })
    }
  });
};

export const deleteTask =(id:number) => {
  return prisma.task.delete({
    where: {
      id
    }
  });
};
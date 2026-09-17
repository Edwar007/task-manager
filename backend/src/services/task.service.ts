import { getAllTasks,createTask, getTaskId, updateTask, deleteTask } from "../repositories/task.repository.js";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";

export const getTaskIdService = (id: number, userId: number): Promise<TaskDTO | null> => {
    return getTaskId(id, userId);
};

export const getTaskService = (userId: number): Promise<TaskDTO[]> => {
  return getAllTasks(userId);
};

export const createTaskService = (data: CreateTaskDTO, userId: number): Promise<TaskDTO> => {
  return createTask(data, userId);
};

export const updateTaskService = (id:number, data:UpdateTaskDTO, userId: number): Promise<TaskDTO> =>{
    return updateTask(id, data, userId);
};

export const deleteTaskIdService = (id: number, userId: number) => {
    return deleteTask(id, userId);
};
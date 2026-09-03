import { getAllTasks,createTask, getTaskId, updateTask, deleteTask } from "../repositories/task.repository.js";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";

export const getTaskIdService = (id: number): Promise<TaskDTO | null> => {
    return getTaskId(id);
};

export const getTaskService = (): Promise<TaskDTO[]> => {
  return getAllTasks();
};

export const createTaskService = (data : CreateTaskDTO): Promise<TaskDTO> => {
  return createTask(data);
};

export const updateTaskService = (id:number, data:UpdateTaskDTO): Promise<TaskDTO> =>{
    return updateTask(id, data);
};

export const deleteTaskIdService = (id: number) => {
    return deleteTask(id);
};
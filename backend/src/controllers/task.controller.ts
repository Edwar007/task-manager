import { Request, Response } from "express";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";
import { getTaskService, createTaskService, getTaskIdService, updateTaskService, deleteTaskIdService} from "../services/task.service.js";
import { AppError } from "../errors/app.error.js";

export const getTaskIdController = async (req: Request<{ id: string}, TaskDTO | null, {}>, res: Response) => {
  const id = Number(req.params.id);
  const task = await getTaskIdService(id, req.userId);
  if (!task) throw new AppError("Resource not found", 404);
  res.json(task);
};

export const getTasksController = async ( req: Request<{}, TaskDTO[], {}>, res: Response) => {
  const tasks = await getTaskService(req.userId);
  res.json(tasks);
};

export const createTaskController = async (req: Request<{}, TaskDTO, CreateTaskDTO>, res: Response) => {
  const task = await createTaskService(req.body, req.userId);
  res.status(201).json(task);
};

export const updateTaskController = async (req: Request<{ id: string }, TaskDTO, UpdateTaskDTO>, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const task = await updateTaskService(id, data, req.userId);
  res.status(200).json(task);
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteTaskIdService(id, req.userId);
  res.status(204).send();
};

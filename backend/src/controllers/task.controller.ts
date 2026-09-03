import { Request, Response } from "express";
import { CreateTaskDTO, UpdateTaskDTO, TaskDTO } from "../types/task.types.js";
import { getTaskService, createTaskService, getTaskIdService, updateTaskService, deleteTaskIdService} from "../services/task.service.js";
import { createTaskSchema, updateTaskSchema, taskIdSchema} from "../schemas/task.schema.js";
import { AppError } from "../errors/app.error.js";

export const getTaskIdController = async (req: Request<{ id: string}, TaskDTO | null, {}>, res: Response) => {
  const id = Number(req.params.id);
  const task = await getTaskIdService(id);
  if (!task) throw new AppError("Task not found", 404);
  res.json(task);
};

export const getTasksController = async ( req: Request<{}, TaskDTO[], {}>, res: Response) => {
  const tasks = await getTaskService();
  res.json(tasks);
};

export const createTaskController = async (req: Request<{}, TaskDTO, CreateTaskDTO>, res: Response) => {
  const data = req.body;
  const task = await createTaskService(data);
  res.status(201).json(task);
};

export const updateTaskController = async (req: Request<{ id: string }, TaskDTO, UpdateTaskDTO>, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const task = await updateTaskService(id, data);
  res.status(200).json(task);
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteTaskIdService(id);
  res.status(201).send();
};

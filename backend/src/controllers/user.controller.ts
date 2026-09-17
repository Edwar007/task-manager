import { Request, Response } from "express";
import { createLoginDTO, createUserDTO, LoginResponseDTO, updateUserDTO, userDTO } from "../types/user.types.js";
import { getUserIdService, getAllUsersService, createUserService, updateUserService, deleteUserService, loginService, passwordChangeService} from "../services/user.service.js";
import { AppError } from "../errors/app.error.js";

export const getUserIdController = async (req: Request<{ id: string}, userDTO | null, {}>, res: Response) => {
  const id = Number(req.params.id);
  const task = await getUserIdService(id);
  if (!task) throw new AppError("Resource not found", 404);
  res.json(task);
};

export const getAllUsersController = async ( req: Request<{}, userDTO[], {}>, res: Response) => {
  const tasks = await getAllUsersService();
  res.json(tasks);
};

export const createUserController = async (req: Request<{}, userDTO, createUserDTO>, res: Response) => {
  const data = req.body;
  const task = await createUserService(data);
  res.status(201).json(task);
};

export const updateUserController = async (req: Request<{ id: string }, userDTO, updateUserDTO>, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const task = await updateUserService(id, data);
  res.status(200).json(task);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteUserService(id);
  res.status(204).send();
};

export const loginController = async(req:Request<{},LoginResponseDTO, createLoginDTO>, res:Response) =>{
  const data = req.body;
  const token = await loginService(data);
  res.status(200).json(token);
}

export const passwordChangeController = async(req:Request<{},{}, updateUserDTO>, res:Response) =>{
  const data = req.body;
  await passwordChangeService(data);
  res.status(204).send();
}
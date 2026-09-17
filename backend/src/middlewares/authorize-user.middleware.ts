import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.params.id);

    if (req.userId !== userId) {
    throw new AppError("Forbidden", 403);
    }

    next();
};
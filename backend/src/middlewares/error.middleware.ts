import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app.error";
import { Prisma } from "../generated/prisma/client.js";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation error",
      details: err.issues
    });
    return;
  }

  if (err instanceof AppError) { 
    res.status(err.statusCode).json({ 
        error: err.message 
    }); return; 
  }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
            res.status(404).json({
            error: "Task not found"
            });
            return;
        }
    }

  res.status(500).json({
    error: "Internal Server Error"
  });
};


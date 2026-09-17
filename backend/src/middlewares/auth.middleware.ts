import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../errors/app.error.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Authorization header required", 401);
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        throw new AppError("Invalid authorization format", 401);
    }

    let payload;

    try {
        payload = jwt.verify(token, env.JWT_SECRET);
    } catch {
        throw new AppError("Invalid or expired token", 401);
    }

    if (typeof payload === "string" || payload.sub === undefined) {
        throw new AppError("Invalid token payload", 401);
    }

    const userId = Number(payload.sub);

    if (!Number.isInteger(userId) || userId <= 0) {
        throw new AppError("Invalid token payload", 401);
    }

    req.userId = userId;

    next();

};
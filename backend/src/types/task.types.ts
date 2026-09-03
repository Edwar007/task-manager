import {createTaskSchema, updateTaskSchema} from "../schemas/task.schema";
import { z } from "zod";

export type TaskDTO = {
    id: number,
    title: string,
    description: string|null,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
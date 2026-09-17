import { Router } from "express";
import { getTasksController, createTaskController, getTaskIdController, updateTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { validate} from "../middlewares/validate.middleware.js";
import { taskIdSchema,createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeUser } from "../middlewares/authorize-user.middleware.js";

const router = Router();

router.get("/", authMiddleware, getTasksController);
router.get("/:id", authMiddleware, validate(taskIdSchema, "params"), getTaskIdController);
router.post("/", authMiddleware, validate(createTaskSchema, "body"),  createTaskController);
router.patch("/:id", authMiddleware, validate(taskIdSchema, "params"), validate(updateTaskSchema,"body"), updateTaskController); 
router.delete("/:id", authMiddleware, validate(taskIdSchema,"params"), deleteTaskController); 

export default router;
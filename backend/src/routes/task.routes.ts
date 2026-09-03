import { Router } from "express";
import { getTasksController, createTaskController, getTaskIdController, updateTaskController, deleteTaskController } from "../controllers/task.controller.js";
import { validate} from "../middlewares/validate.middleware.js";
import { taskIdSchema,createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", getTasksController);
router.get("/:id", validate(taskIdSchema, "params"),getTaskIdController);
router.post("/", validate(createTaskSchema, "body"),  createTaskController);
router.patch("/:id", validate(taskIdSchema, "params"), validate(updateTaskSchema,"body"), updateTaskController); 
router.delete("/:id", validate(taskIdSchema,"params"),deleteTaskController); 

export default router;
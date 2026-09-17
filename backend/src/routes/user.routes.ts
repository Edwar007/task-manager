import { Router } from "express";
import { getUserIdController, getAllUsersController, createUserController, updateUserController, deleteUserController, loginController,passwordChangeController } from "../controllers/user.controller.js";
import { validate} from "../middlewares/validate.middleware.js";
import { userIdSchema,createUserSchema, updateUserSchema, createLoginSchema} from "../schemas/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeUser } from "../middlewares/authorize-user.middleware.js";

const router = Router();

router.get("/",authMiddleware, getAllUsersController);
router.get("/:id", authMiddleware, validate(userIdSchema, "params"), authorizeUser, getUserIdController);
router.post("/", validate(createUserSchema, "body"),  createUserController);
router.post("/login", validate(createLoginSchema,"body"), loginController); 
router.put("/:id",authMiddleware,validate(userIdSchema, "params"), authorizeUser, validate(updateUserSchema,"body"), updateUserController); 
router.patch("/",authMiddleware, validate(updateUserSchema,"body"), passwordChangeController);  
router.delete("/:id",authMiddleware, validate(userIdSchema,"params"), authorizeUser, deleteUserController);

export default router;
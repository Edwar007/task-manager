import express from "express";
import taskRoutes from "./routes/task.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use(errorMiddleware);
export default app;
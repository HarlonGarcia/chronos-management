import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { usersController } from "@controllers/users.controller";
import { tasksController } from "@controllers/tasks.controller";

const PORT = process.env.PORT || 8000;

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(usersController)
  .use(tasksController)
  .listen(PORT);

console.warn(
  `⏰ Chronos is running at ${app.server?.hostname}:${app.server?.port}`
);

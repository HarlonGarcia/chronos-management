import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { usersController } from "@controllers/users.controller";
import { tasksController } from "@controllers/tasks.controller";
import { authController } from "@controllers/auth.controller";
import { authMiddleware } from "@middlewares/auth.middleware";

const PORT = process.env.PORT!;

const privateRoutes = (app: Elysia) => (
  app.use(tasksController), app.use(usersController)
);

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(authController)
  .guard(
    {
      beforeHandle: authMiddleware,
    },
    privateRoutes,
  )
  .listen(PORT);

console.warn(
  `⏰ Chronos is running at ${app.server?.hostname}:${app.server?.port}`,
);

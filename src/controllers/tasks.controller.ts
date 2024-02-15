import { Elysia, t } from "elysia";
import { create, deleteById, getAll } from "@services/tasks.service";
import { CreateTaskDtoSchema } from "@dtos/tasks";
import { Exception } from "@exceptions/custom.exception";

const tasksWithHeaders = {
  headers: t.Object({
    "user-id": t.String(),
  }),
};

export const tasksController = (app: Elysia) => {
  app.get(
    "/tasks",
    async ({ headers, set }) => {
      try {
        const response = getAll(headers["user-id"]);
        return response;
      } catch (error) {
        set.status = (error as Exception).statusCode;
        return error;
      }
    },
    tasksWithHeaders,
  );

  app.post(
    "/tasks",
    async ({ body, headers, set }) => {
      try {
        const response = create(body, headers["user-id"]);
        return response;
      } catch (error) {
        set.status = (error as Exception).statusCode;
        return error;
      }
    },
    {
      ...tasksWithHeaders,
      body: CreateTaskDtoSchema,
    },
  );

  app.delete("/tasks/:id", async ({ params }) => {
    const response = deleteById(params.id);
    return response;
  });

  return app;
};

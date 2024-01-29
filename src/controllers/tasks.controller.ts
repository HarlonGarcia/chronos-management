import { Elysia, t } from "elysia";
import { create, deleteById, getAll } from "@services/tasks.service";

const tasksHeadersType = {
  headers: t.Object({
    USER_ID: t.String(),
  }),
};

export const tasksController = (app: Elysia) => {
  app.get("/tasks", async ({ headers }) => {
    const response = getAll(headers.USER_ID);
    return response;
  }, tasksHeadersType);

  app.post("/tasks", async ({ body, headers }) => {
    const response = create(body, headers.USER_ID);
    return response;
  }, {
    ...tasksHeadersType,
    body: t.Object({
      title: t.String(),
    }),
  });

  app.delete("/tasks/:id", async ({ params }) => {
    const response = deleteById(params.id);
    return response;
  });

  return app;
}
import { Elysia, t } from "elysia";
import { create, deleteById, getAll, getById } from "@services/users.service";

export const usersController = (app: Elysia) => {
  app.get("/users", async () => {
    const response = getAll();
    return response;
  });

  app.get("/users/:id", async ({ params }) => {
    const response = getById(params.id);
    return response;
  });

  app.post("/users", async ({ body }) => {
    const response = create(body);
    return response;
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      name: t.String(),
    }),
  });

  app.delete("/users/:id", async ({ params }) => {
    const response = deleteById(params.id);
    return response;
  });

  return app;
}
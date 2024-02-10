import { Elysia } from "elysia";
import { create, deleteById, getAll, getById } from "@services/users.service";
import { CreateUserDtoSchema } from "@dtos/users";
import { Exception } from "@exceptions/index";

export const usersController = (app: Elysia) => {
  app.get("/users", async () => {
    const response = getAll();
    return response;
  });

  app.get("/users/:id", async ({ params }) => {
    const response = getById(params.id);
    return response;
  });

  app.post(
    "/users",
    async ({ body, set }) => {
      try {
        const response = create(body);
        return response;
      } catch (error) {
        set.status = (error as Exception).statusCode;
        return error;
      }
    },
    {
      body: CreateUserDtoSchema,
    },
  );

  app.delete("/users/:id", async ({ params, set }) => {
    try {
      const response = deleteById(params.id);
      return response;
    } catch (error) {
      set.status = (error as Exception).statusCode;
      return error;
    }
  });

  return app;
};

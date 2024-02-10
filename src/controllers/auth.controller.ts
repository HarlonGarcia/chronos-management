import { Elysia } from "elysia";
import { authenticate, register } from "@services/auth.service";
import { LoginDtoSchema, SignupDtoSchema } from "@dtos/auth";
import { Exception } from "@exceptions/index";

export const authController = (app: Elysia) => {
  app.post(
    "/login",
    async ({ body, set }) => {
      try {
        const response = await authenticate(body);
        return response;
      } catch (error) {
        set.status = (error as Exception).statusCode;
        return error;
      }
    },
    {
      body: LoginDtoSchema,
    },
  );

  app.post(
    "/signup",
    async ({ body, set }) => {
      try {
        const response = await register(body);
        return response;
      } catch (error) {
        set.status = (error as Exception).statusCode;
        return error;
      }
    },
    {
      body: SignupDtoSchema,
    },
  );

  return app;
};

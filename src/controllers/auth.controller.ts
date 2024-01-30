import { Elysia, t } from "elysia";
import {  } from "@services/users.service";
import { authenticate, register } from "@services/auth.service";

export const authController = (app: Elysia) => {
  app.post("/login", async ({ body }) => {
    const response = authenticate(body);
    return response;
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  });

  app.post("/signup", async ({ body }) => {
    const response = register(body);
    return response;
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.String(),
      password: t.String(),
    }),
  });

  return app;
}
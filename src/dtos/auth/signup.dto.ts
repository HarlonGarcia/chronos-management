import { t } from "elysia";

export const SignupDtoSchema = t.Object({
  name: t.Optional(t.String()),
  email: t.String(),
  password: t.String(),
});

import { t } from "elysia";

export interface LoginDto {
  email: string;
  password: string;
}

export const LoginDtoSchema = t.Object({
  email: t.String(),
  password: t.String(),
});

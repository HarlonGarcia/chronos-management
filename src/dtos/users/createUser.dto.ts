import { t } from "elysia";

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export const CreateUserDtoSchema = t.Object({
  email: t.String(),
  password: t.String(),
  name: t.String(),
});

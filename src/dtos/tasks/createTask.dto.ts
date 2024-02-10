import { t } from "elysia";

export interface CreateTaskDto {
  title: string;
}

export const CreateTaskDtoSchema = t.Object({
  title: t.String(),
});

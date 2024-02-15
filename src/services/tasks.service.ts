import { CreateTaskDto } from "@dtos/tasks";
import { Exception } from "@exceptions/custom.exception";
import { UserNotFoundError } from "@exceptions/index";
import tasksRepository from "@repositories/tasks.repository";
import * as userService from "@services/users.service";

export async function getAll(userId: string) {
  if (!userId) {
    throw new Exception("USER_ID is required", 400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const tasks = await tasksRepository.getAll(userId);
  return tasks;
}

export async function create(taskPayload: CreateTaskDto, userId: string) {
  if (!userId) {
    throw new Exception("USER_ID is required", 400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    throw new UserNotFoundError();
  }

  const taskWithUser = {
    ...taskPayload,
    userId,
  };

  const task = await tasksRepository.create(taskWithUser);

  return task;
}

export async function deleteById(id: string) {
  const tasks = await tasksRepository.delete(id);
  return tasks;
}

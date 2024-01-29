import { CreateTaskDto } from "@dtos/tasks";
import tasksRepository from "@repositories/tasks.repository";

export async function getAll(userId: string) {
  const tasks = await tasksRepository.getAll(userId);
  return tasks;
}

export async function create(taskPayload: CreateTaskDto, userId: string) {
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
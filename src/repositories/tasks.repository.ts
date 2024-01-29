import { prisma } from "@database/prisma";
import { CreateTaskWithUserDto } from "@dtos/tasks";

class TasksRepository {
  async getAll(userId: string) {
    const tasks = await prisma.task.findMany({
      where: { userId }
    });

    return tasks;
  }

  async create(taskDto: CreateTaskWithUserDto) {  
    const task = await prisma.task.create({
      data: taskDto,
    });

    return task;
  }

  async delete(id: string) {
    const task = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    return task;
  }
}

export default new TasksRepository();
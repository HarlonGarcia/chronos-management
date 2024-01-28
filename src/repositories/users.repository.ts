import { prisma } from "@database/prisma";
import { CreateUserDto } from "@dtos/users";

class UsersRepository {
  async getAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        tasks: true,
      }
    });

    return user;
  }

  async create(userDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: userDto,
    });

    return user;
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: { id },
    });

    return user;
  }
}

export default new UsersRepository();
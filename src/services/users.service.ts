import { CreateUserDto } from "@dtos/users";
import usersRepository from "@repositories/users.repository";
import { encrypt } from "helpers/hash";

export async function getAll() {
  const users = await usersRepository.getAll();
  return users;
}

export async function create(userPayload: CreateUserDto) {
  const hash = await encrypt(userPayload.password);

  const user = await usersRepository.create({
    ...userPayload,
    password: hash,
  });

  return user;
}

export async function getById(id: string) {
  const user = await usersRepository.getById(id);
  return user;
}

export async function deleteById(id: string) {
  const user = await usersRepository.delete(id);
  return user;
}
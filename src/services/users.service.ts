import { CreateUserDto } from "@dtos/users";
import usersRepository from "@repositories/users.repository";
import { hash } from "bcryptjs";

export async function getAll() {
  const users = await usersRepository.getAll();
  return users;
}

export async function create({ password, ...rest }: CreateUserDto) {
  const encryptedPassword = await hash(password, Number(process.env.BCRYPT_SALT!));
  
  const user = await usersRepository.create({
    ...rest,
    password: encryptedPassword,
  });

  return user;
}

export async function getById(id: string) {
  const user = await usersRepository.getById(id);
  return user;
}

export async function getByEmail(email: string) {
  const user = await usersRepository.getByEmail(email);
  return user;
}

export async function deleteById(id: string) {
  const user = await usersRepository.delete(id);
  return user;
}
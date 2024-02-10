import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDto } from "@dtos/auth";
import usersRepository from "@repositories/users.repository";
import { AuthenticationError } from "@exceptions/auth.exception";
import { CreateUserDto } from "@dtos/users";
import * as usersService from "@services/users.service";
import { UserAlreadyExistsError, UserNotFoundError } from "@exceptions/user.exception";

export async function authenticate({ email, password }: LoginDto) {
  const user = await usersRepository.getByEmail(email);

  if (!user) {
    throw new UserNotFoundError();
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    throw new AuthenticationError('Incorrect password');
  }

  return generateToken(user.id);
}

export async function register(user: CreateUserDto) {
  const userAlreadyExists = await usersRepository.getByEmail(user.email);

  if (userAlreadyExists) {
    throw new UserAlreadyExistsError();
  }

  const createdUser = await usersService.create(user);

  return generateToken(createdUser.id);
}

export function generateToken(id: string) {
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });

  return {
    accessToken: token,
  };
}
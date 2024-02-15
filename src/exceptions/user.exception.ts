import { Exception } from ".";

export class UserNotFoundError extends Exception {
  constructor(public message = "User not found") {
    super(message, 404);
    this.name = "UserNotFound_Error";
  }
}

export class UserAlreadyExistsError extends Exception {
  constructor(public message = "User already exists") {
    super(message, 409);
    this.name = "UserAlreadyExists_Error";
  }
}
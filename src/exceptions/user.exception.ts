export class UserNotFoundError extends Error {
  constructor(public message = "User not found") {
    super(message);
    this.name = "UserNotFound_Error";
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(public message = "User already exists") {
    super(message);
    this.name = "UserAlreadyExists_Error";
  }
}

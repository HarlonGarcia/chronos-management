import { Exception } from "./custom.exception";

export class AuthenticationError extends Exception {
  constructor(public message = "Authentication error") {
    super(message, 401);
    this.name = "Authentication_Error";
  }
}

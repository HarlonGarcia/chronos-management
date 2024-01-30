export class AuthenticationError extends Error {
  constructor(public message = "Authentication error") {
    super(message);
    this.name = "Authentication_Error";
  }
}

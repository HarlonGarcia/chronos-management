export * from "./user.exception";
export * from "./auth.exception";

export class Exception extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Unknown_Error";
  }
}

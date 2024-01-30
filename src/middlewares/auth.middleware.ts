import { AuthenticationError } from "@exceptions/auth.exception";
import jwt from "jsonwebtoken";

export function authMiddleware({ headers }: { headers: IHeaders }) {
  const accessToken = headers.authorization;

  if (!accessToken) {
    throw new AuthenticationError("No access token provided");
  }

  const [, token] = accessToken.split(" ");

  try {
    if (process.env.JWT_SECRET === undefined) {
      throw new AuthenticationError("Environment variable needed is not defined");
    }

    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET) as IJwtPayload;

    headers.userId = userId;

  } catch (error) {
    return {
      status: 401,
      body: {
        name: "Unauthorized",
        message: "User is not authorized to access this resource",
      },
    }
  }
}
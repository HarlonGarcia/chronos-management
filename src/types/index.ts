type IHeaders = Record<string, string | undefined>

interface IJwtPayload {
  sub: string;
  iat: number;
  exp: number;
}
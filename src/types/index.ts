export type IHeaders = Record<string, string | undefined>;

export interface IJwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

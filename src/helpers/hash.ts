import { password } from "bun";

export function encrypt(text: string) {
  return password.hash(text, {
    algorithm: "bcrypt",
  });
}

export function compare(text: string, hash: string) {
  return password.verify(text, hash, "bcrypt");
}
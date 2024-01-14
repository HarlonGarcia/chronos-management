import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Chronos is running!")
  .listen(process.env.PORT || 8000);

console.warn(
  `🦊 Chronos is running at ${app.server?.hostname}:${app.server?.port}`
);

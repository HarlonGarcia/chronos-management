import { describe, expect, test } from "bun:test";
import { app } from "app";

const baseUrl = `${process.env.BASE_URL!}`;

describe("login", () => {
  test("should return the access token", async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.TEST_USER_EMAIL!,
        password: process.env.TEST_USER_PASSWORD!,
      }),
    };

    const response = await app.handle(new Request(`${baseUrl}/login`, options));
    const json = await response.json();

    expect(json).toContainKeys(["accessToken"]);
  });

  test("should return a message saying user not found", async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "johndoe@email.com",
        password: "john123",
      }),
    };

    const response = await app.handle(new Request(`${baseUrl}/login`, options));
    const json = await response.json();

    expect(json).toStrictEqual({
      statusCode: 404,
      message: "User not found",
      name: "UserNotFound_Error",
    });

    expect(response.status).toBe(404);
  });

  test("should return a message saying incorrect password", async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.TEST_USER_EMAIL!,
        password: "john123",
      }),
    };

    const response = await app.handle(new Request(`${baseUrl}/login`, options));
    const json = await response.json();

    expect(json).toStrictEqual({
      statusCode: 401,
      message: "Incorrect password",
      name: "Authentication_Error",
    });

    expect(response.status).toBe(401);
  });
});

describe("signup", () => {
  test("should return the access token", async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "johndoe@gmail.com",
        password: "john123",
      }),
    };

    const response = await app.handle(
      new Request(`${baseUrl}/signup`, options),
    );

    const json = await response.json();

    expect(json).toContainKeys(["accessToken"]);
  });

  test("should return a message saying user already exists", async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.TEST_USER_EMAIL!,
        password: process.env.TEST_USER_PASSWORD!,
      }),
    };

    const response = await app.handle(
      new Request(`${baseUrl}/signup`, options),
    );

    const json = await response.json();

    expect(json).toStrictEqual({
      statusCode: 409,
      message: "User already exists",
      name: "UserAlreadyExists_Error",
    });

    expect(response.status).toBe(409);
  });
});

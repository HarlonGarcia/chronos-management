import { describe, expect, test } from "bun:test";
import { app } from "app";
import { headersWithoutToken, noTokenErrorResponse } from "./utils";

const url = `${process.env.BASE_URL!}/users`;

describe("get all users fail", () => {
  test("should return a message saying that no token was provided", async () => {
    const http = await app.handle(new Request(url));
    const response = await http.json();

    expect(response).toStrictEqual({
      statusCode: 401,
      message: "No access token provided",
      name: "Authentication_Error",
    });
  });

  test("should return an unauthorized message", async () => {
    const options = {
      headers: headersWithoutToken,
    };

    const http = await app.handle(new Request(url, options));
    const response = await http.json();

    expect(response.body).toStrictEqual(noTokenErrorResponse);
    expect(response.status).toBe(401);
  });
});

describe("get all users success", () => {
  test("should return a json containing an users array", async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    const response = await app.handle(new Request(url, options));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toBeArray();
  });
});

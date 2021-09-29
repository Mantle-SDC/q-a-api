import request from "supertest";
import http from "http";
import { Response } from "superagent";
import App from "../app";
import baseUrl from "../../dist/src/urls";

describe("Given a blank database", () => {
  let server: http.Server;
  beforeEach(() => {
    server = App();
  });
  afterEach(() => {
    server.close();
  });
  describe("When a blank post is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).send({});
    });
    test("Then the response should have a 400 response", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
});

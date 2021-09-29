import request from "supertest";
import http from "http";
import { Response } from "superagent";
import App from "../app";

describe("Given a blank database", () => {
  let server: http.Server;
  beforeEach(() => {
    server = App();
  });
  afterEach(() => {
    server.close();
  });
  describe("When a post is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post("/qa/questions").send({});
    });
    test("Then the response should have a 201 response", () => {
      expect(postResponse.statusCode).toBe(201);
    });
  });
});

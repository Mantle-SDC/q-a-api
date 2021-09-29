import request from "supertest";
import express from "express";
import { Response } from "superagent";
import App from "../app";

describe("Given a blank database", () => {
  let app: express.Express;
  beforeEach(() => {
    app = App();
  });
  describe("When a post is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(app).post("/qa/questions").send({});
    });
    test("Then the response should have a 201 response", () => {
      expect(postResponse.statusCode).toBe(201);
    });
  });
});

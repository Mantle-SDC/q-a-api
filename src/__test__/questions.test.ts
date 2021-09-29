import request from "supertest";
import http from "http";
import { Response } from "superagent";
import App from "../app";
import baseUrl from "../urls";
import InMemory from "../database/InMemory";

describe("Given a blank database", () => {
  let server: http.Server;
  beforeEach(() => {
    server = App(InMemory());
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
  describe("When a blank get is made to /qa/questions", () => {
    let getResponse: Response;
    beforeEach(async () => {
      getResponse = await request(server).get(baseUrl).send({});
    });
    test("The the server responds with 400", () => {
      expect(getResponse.statusCode).toBe(400);
    });
  });
  describe("When a valid get is made to /qa/questions", () => {
    let getResponse: Response;
    beforeEach(async () => {
      getResponse = await request(server).get(baseUrl).send({
        product_id: 1,
      });
    });
    test("The the server responds with 200", () => {
      expect(getResponse.statusCode).toBe(200);
    });
    test("The the server responds with product_id", () => {
      expect(getResponse.body.product_id).toBe(1);
    });
    test("The the server responds with empty list of results", () => {
      expect(getResponse.body.results).toEqual([]);
    });
  });
  describe("When a valid post is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).send({
        body: "What is this?",
        name: "Trevor Settles",
        email: "email@gmail.com",
        product_id: 1,
      });
    });
    test("Then the response should have a 201 response", () => {
      expect(postResponse.statusCode).toBe(201);
    });
    describe("And a valid get is made to /qa/questions", () => {
      let getResponse: Response;
      beforeEach(async () => {
        getResponse = await request(server).get(baseUrl).send({
          product_id: 1,
        });
      });
      test("Then the get should contain a single result", () => {
        expect(getResponse.body.results).toHaveLength(1);
      });
      test("Then the response should have the correct shape", () => {
        const result = getResponse.body.results[0];
        expect(result).toHaveProperty("question_id");
        expect(result).toHaveProperty("question_body", "What is this?");
        expect(result).toHaveProperty("question_date");
        expect(result).toHaveProperty("asker_name", "Trevor Settles");
        expect(result).toHaveProperty("question_helpfulness", 0);
        expect(result).toHaveProperty("reported", false);
        expect(result).toHaveProperty("answers", {});
      });
    });
  });
});

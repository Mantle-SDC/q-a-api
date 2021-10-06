import request from "supertest";
import http from "http";
import { Response } from "superagent";
import { MongoMemoryServer } from "mongodb-memory-server";
import App from "../app";
import baseUrl from "../urls";
import Database from "../database/database";
import createMongoDB from "../database/MongoDB";

const validPost = {
  body: "What is this?",
  name: "Trevor Settles",
  email: "email@gmail.com",
  product_id: 1,
};

describe("Given a blank database", () => {
  let server: http.Server;
  let db: Database<string>;
  beforeEach((done) => {
    (async () => {
      const mem = await MongoMemoryServer.create();
      const url = mem.getUri();
      db = createMongoDB(url);
      server = App(
        db,
        () => new Date(0),
        8080,
        (x) => x,
      );
      done();
    })();
  });
  afterEach(() => {
    server.close();
    db.close();
  });
  describe("When a blank POST is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({});
    });
    test("Then the response should have a 400 status code", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
  describe("When a blank GET is made to /qa/questions", () => {
    let getResponse: Response;
    beforeEach(async () => {
      getResponse = await request(server).get(baseUrl).query({});
    });
    test("The the server responds with 400", () => {
      expect(getResponse.statusCode).toBe(400);
    });
  });
  describe("When a valid GET is made to /qa/questions", () => {
    let getResponse: Response;
    beforeEach(async () => {
      getResponse = await request(server).get(baseUrl).query({
        product_id: 1,
      });
    });
    test("Then the server responds with 200", () => {
      expect(getResponse.statusCode).toBe(200);
    });
    test("The the server responds with product_id", () => {
      expect(getResponse.body.product_id).toBe(1);
    });
    test("The the server responds with empty list of results", () => {
      expect(getResponse.body.results).toEqual([]);
    });
  });
  describe("When a valid POST is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({
        body: "What is this?",
        name: "Trevor Settles",
        email: "email@gmail.com",
        product_id: 1,
      });
    });
    test("Then the response should have a 201 response", () => {
      expect(postResponse.statusCode).toBe(201);
    });
    test("then the response should contain the id of the question created", () => {
      expect(typeof postResponse.body.question_id).toBeTruthy();
    });
    describe("And a valid GET is made to /qa/questions", () => {
      let getResponse: Response;
      beforeEach(async () => {
        getResponse = await request(server).get(baseUrl).query({
          product_id: 1,
        });
      });
      test("Then the GET should contain a single result", () => {
        expect(getResponse.body.results).toHaveLength(1);
      });
      test("Then the response should have the correct shape and values", () => {
        const result = getResponse.body.results[0];
        expect(result).toHaveProperty("question_id");
        expect(result).toHaveProperty("question_body", "What is this?");
        expect(result).toHaveProperty("question_date", "1970-01-01T00:00:00.000Z");
        expect(result).toHaveProperty("asker_name", "Trevor Settles");
        expect(result.question_helpfulness).toBe(0);
        expect(result).toHaveProperty("reported", false);
        expect(result.answers).toEqual([]);

        expect(typeof result.question_id).toBeTruthy();
      });
    });
    describe("When a valid POST is made to /qa/questions with a different product_id", () => {
      let otherPostResponse: Response;
      beforeEach(async () => {
        otherPostResponse = await request(server).post(baseUrl).query({
          body: "Can I wear it?",
          name: "Trevor Settles",
          email: "email@gmail.com",
          product_id: 2,
        });
      });
      describe("When a GET is made for the first product_id", () => {
        let getResponse: Response;
        beforeEach(async () => {
          getResponse = await request(server).get(baseUrl).query({
            product_id: 1,
          });
        });
        test("Then the response only cotains the question for the first product", () => {
          expect(getResponse.body.results).toHaveLength(1);
        });
      });
      describe("When a GET is made for the second product_id", () => {
        let getResponse: Response;
        beforeEach(async () => {
          getResponse = await request(server).get(baseUrl).query({
            product_id: 2,
          });
        });
        test("Then the response cotains the questions for the second product", () => {
          expect(getResponse.body.results[0].question_id).toBe(otherPostResponse.body.question_id);
        });
      });
    });
  });
  describe("When a POST without a name is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({
        ...validPost,
        name: undefined,
      });
    });
    test("Then the server responds with 400 status code", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
  describe("When a POST without a body is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({
        ...validPost,
        body: undefined,
      });
    });
    test("Then the server responds with 400 status code", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
  describe("When a POST without an email is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({
        ...validPost,
        email: undefined,
      });
    });
    test("Then the server responds with 400 status code", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
  describe("When a POST without a productId is made to /qa/questions", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(baseUrl).query({
        ...validPost,
        product_id: undefined,
      });
    });
    test("Then the server responds with 400 status code", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
});

import request from "supertest";
import http from "http";
import { Response } from "superagent";
import { MongoMemoryServer } from "mongodb-memory-server";
import App from "../app";
import baseUrl from "../urls";
import Database from "../database/database";
import createMongoDB from "../database/MongoDB";

const validPost = {
  body: "its pretty great",
  name: "Trevor Settles",
  email: "email@gmail.com",
  photos: [],
};

describe("Given a server with no questions", () => {
  let server: http.Server;
  let db: Database<string>;
  beforeEach((done) => {
    (async () => {
      const url = (await MongoMemoryServer.create()).getUri();
      db = createMongoDB(url);
      server = App(
        db,
        () => new Date(0),
        8081,
        (x) => x,
      );
      done();
    })();
  });
  afterEach(() => {
    server.close();
    db.close();
  });
  describe("When an otherwise valid POST is sent", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(`${baseUrl}/1/answers`).query(validPost);
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
});
describe("Givena a server with a valid question", () => {
  let server: http.Server;
  let db: Database<string>;
  let postResponse: Response;
  beforeEach(async () => {
    const url = (await MongoMemoryServer.create()).getUri();
    db = createMongoDB(url);
    server = App(
      db,
      () => new Date(0),
      8082,
      (x) => x,
    );
    postResponse = await request(server).post(`${baseUrl}`).query({
      body: "What is this?",
      name: "Trevor Settles",
      email: "email@gmail.com",
      product_id: 1,
    });
  });
  afterEach(() => {
    db.close();
    server.close();
  });
  describe("When a valid POST is made to /qa/questions/:question_id/answers", () => {
    let answerPostResponse: Response;
    beforeEach(async () => {
      answerPostResponse = await request(server).post(`${baseUrl}/${postResponse.body.question_id}/answers`).query(validPost);
    });
    test("then the response should have a 201 status code", () => {
      expect(answerPostResponse.statusCode).toBe(201);
    });
    test("Then the response body should contain the id for the answer created", () => {
      expect(answerPostResponse.body.answer_id).toBeTruthy();
    });
    describe("And when a GET is made for that productId", () => {
      let getResponse: Response;
      beforeEach(async () => {
        getResponse = await request(server).get(baseUrl).query({
          product_id: 1,
        });
      });
      test("Then that answer is in the response", () => {
        const aId: string = answerPostResponse.body.answer_id;
        const { answers } = getResponse.body.results[0];
        expect(answers[0]).toEqual({
          id: aId,
          body: "its pretty great",
          date: "1970-01-01T00:00:00.000Z",
          answerer_name: "Trevor Settles",
          helpfulness: 0,
          photos: [],
        });
      });
    });
  });
});

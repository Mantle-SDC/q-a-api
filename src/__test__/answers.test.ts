import request from "supertest";
import http from "http";
import { Response } from "superagent";
import App from "../app";
import baseUrl from "../urls";
import InMemory from "../database/InMemory";

const validPost = {
  body: "its pretty great",
  name: "Trevor Settles",
  email: "email@gmail.com",
  photos: [],
};

describe("Given a server with no questions", () => {
  let server: http.Server;
  beforeEach(() => {
    server = App(
      InMemory(),
      () => new Date(0),
      8081,
    );
  });
  afterEach(() => {
    server.close();
  });
  describe("When an otherwise valid POST is sent", () => {
    let postResponse: Response;
    beforeEach(async () => {
      postResponse = await request(server).post(`${baseUrl}/1/answers`).send(validPost);
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.statusCode).toBe(400);
    });
  });
});
describe("Givena a server with a valid question", () => {
  let server: http.Server;
  let postResponse: Response;
  beforeEach(async () => {
    server = App(
      InMemory(),
      () => new Date(0),
      8082,
    );
    postResponse = await request(server).post(`${baseUrl}`).send({
      body: "What is this?",
      name: "Trevor Settles",
      email: "email@gmail.com",
      product_id: 1,
    });
  });
  afterEach(() => {
    server.close();
  });
  describe("When a valid POST is made to /qa/questions/1/answers", () => {
    let answerPostResponse: Response;
    beforeEach(async () => {
      answerPostResponse = await request(server).post(`${baseUrl}/${postResponse.body.question_id}/answers`).send(validPost);
    });
    test("then the response should have a 201 status code", () => {
      expect(answerPostResponse.statusCode).toBe(201);
    });
    test("Then the response body should contain the id for the answer created", () => {
      expect(answerPostResponse.body.answer_id).toBe(1);
    });
    describe("And when a GET is made for that productId", () => {
      let getResponse: Response;
      beforeEach(async () => {
        getResponse = await request(server).get(baseUrl).send({
          product_id: 1,
        });
      });
      test("Then that answer is in the response", () => {
        expect(getResponse.body.answers[postResponse.body.answer_id]).toEqual({
          id: postResponse.body.answer_id,
          body: "its pretty great",
          date: "2018-08-18T00:00:00.000Z",
          answerer_name: "Trevor Settles",
          helpfulness: 0,
          photos: [],
        });
      });
    });
  });
});

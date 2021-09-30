import request from "supertest";
import http from "http";
import { post, Response } from "superagent";
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
  describe("When a POST is sent", () => {
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
  test("run", () => {
    expect(true).toBe(true);
  });
});

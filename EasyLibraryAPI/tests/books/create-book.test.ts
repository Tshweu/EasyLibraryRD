import request from "supertest";
import app from "../../src/app";
import { IBook } from "../../src/interfaces/IBook";
import createTables from "../../init";

describe("Book tests", () => {
  let tkn: string = "";

  beforeEach(async () => {
    const response = await request(app).post("/v1/auth").send({
      email: "john@gmail.com",
      password: "john",
    });
    tkn = response.body.token;
  });

  test("should create valid book", async () => {
    const new_book: IBook = {
      title: "John Library 4",
      isbn: "372979109801823",
      author: "Jason",
      publisher: "John",
      year: 2010,
      status: "Available",
      book_condition: "New",
    };
    const response = await request(app)
      .post("/v1/book")
      .set("Authorization", `Bearer ${tkn}`)
      .send(new_book);
    expect(response.statusCode).toBe(201);
  });

});

import { model, Schema, Date } from "mongoose";
import { IBook } from "../interfaces/IBook";

export const book_schema = new Schema<IBook>({
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    publication_year: {type: Number, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    status: {type: String, required: true},
    condition: {type: String, required: true},
    date: { type: String, required: true},
    // member: {}
});

export const Book = model('Book',book_schema);
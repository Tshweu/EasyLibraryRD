import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,(err,res)=>{
    if(err) console.log(err);
    console.log('running on ' + PORT);
});
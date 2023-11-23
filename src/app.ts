import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
const app: Application = express();

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model("Kitten", kittySchema);
/*
app.post("/post", async (req: Request, res: Response) => {
  const dummyData = [
    { name: "John Doe", age: 25, city: "New York" },
    { name: "Jane Smith", age: 30, city: "San Francisco" },
    { name: "Bob Johnson", age: 22, city: "Los Angeles" },
  ];
  try {
    const result = await Kitten.insertMany(dummyData);
    res.status(200).json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      status: true,
      message: "Success",
      error: err,
    });
  }
}); */
app.get("/get-data", async (req: Request, res: Response) => {
  try {
    const result = await Kitten.find();
    res.status(200).json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      status: true,
      message: "Success",
      error: err,
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  const i = "hallo world";
  res.send(i);
});

export default app;

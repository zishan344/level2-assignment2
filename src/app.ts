import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/users/user.route";
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.get("/", (req: Request, res: Response) => {
  const i = "hallo world";
  res.send(i);
});

export default app;

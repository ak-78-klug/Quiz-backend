import express from "express";
import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

// require("dotenv").config();

// import dbConfig from "./config/dbConfig";

// Routes
import usersRoute from "./routes/usersRoute";
import examsRoute from "./routes/examsRoute";
import reportsRoute from "./routes/reportsRoute";

const app: Application = express();

dotenv.config();

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);
const port = process.env.PORT || 5000;

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

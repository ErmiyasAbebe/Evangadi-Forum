require("dotenv").config();
const pool = require("./server/config/database"); //connect db
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/users/user.router");
const app = express();
const port = process.env.PORT;
const questionRouter = require("./server/api/question/question.router");
const answerRouter = require("./server/api/answer/answer.router");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answer", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

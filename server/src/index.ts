import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import { usersRouter } from "./routes/user";
import { blogsRouter } from "./routes/blog";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users",usersRouter);

app.listen(port,() => console.log(`server is running on http://localhost:${port}`));

connectDB();
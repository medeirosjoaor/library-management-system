import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";
import UserRouter from "./routes/user";

const app = express();

app.use(json());
app.use(helmet());
app.use(UserRouter);

app.listen(process.env.NODE_PORT);

export default app;

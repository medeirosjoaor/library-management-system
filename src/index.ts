import express, { json } from "express";
import helmet from "helmet";
import "dotenv/config";

const app = express();

app.use(json());
app.use(helmet());

app.listen(process.env.NODE_PORT);

export default app;

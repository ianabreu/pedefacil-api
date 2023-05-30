import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const PORT = 3333;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});

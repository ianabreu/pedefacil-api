import express from "express";
import "express-async-errors";
import cors from "cors";
import path from "path";

import { router } from "./routes";
import { errorMiddlewere } from "./middlewares/error";

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(errorMiddlewere);

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import EnvSecret from "./constants/envVariables";
import { errorHandler } from "./middlewares/error.middleware";
import apiRoutes from "./modules/index.routes";

const app: Application = express();

// Use middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.send("Hello from the backend!");
});

app.use("/api/v1", apiRoutes);

// Global Error Handler
app.use(errorHandler);

const port = EnvSecret.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));

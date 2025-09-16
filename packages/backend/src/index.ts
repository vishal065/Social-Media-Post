import express from "express";

import EnvSecret from "./constants/envVariables";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello from the backend!");
});

const port = EnvSecret.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));

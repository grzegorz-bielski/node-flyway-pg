import express from "express";
import { join } from "path";

const webServer = express();

webServer.get("/", (_req, res) => {
  res.sendFile(join(__dirname, "./index.html"));
});

export { webServer };

import express from "express";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import got from "got";
import cors from "cors";

const proxyServer = express();

// https://nodesource.com/blog/understanding-streams-in-nodejs/
// https://nodejs.org/en/docs/guides/backpressuring-in-streams/
const pipe = promisify(pipeline);

proxyServer.use(cors());

proxyServer.put("/upload-proxy", async (req, res) => {
  try {
    const uploadStream = got.stream.put("http://localhost:3002/upload-receive");

    await pipe(req, uploadStream);

    const response = await parseResponse(uploadStream);

    console.log("response", response);
    // save it to the DB or whatever

    res.status(200).type("application/json").send(response);
  } catch (err) {
    res.status(500).type("application/json").send({ result: "Upload error" });
  }
});

export { proxyServer };

type Response = { result: string };
async function parseResponse(readable: Readable): Promise<Response> {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(chunk);
  }

  // there should be some validation
  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

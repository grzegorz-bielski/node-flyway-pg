import express from "express";
import multer from "multer";
import { extname } from "path";

const uploadServer = express();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, fn) =>
    fn(null, `${Date.now()}${extname(file.originalname)}`),
});

const upload = multer({ storage: storage });

uploadServer.put("/upload-receive", upload.single("someFile"), (req, res) => {
  console.log(req.file, req.body);

  res
    .status(200)
    .type("application/json")
    .send({ result: "Everything is fine" });
});

export { uploadServer };

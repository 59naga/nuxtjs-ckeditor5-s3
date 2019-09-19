const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const express = require("express");
const cors = require("cors");

const mime = require("mime");
const uuidv4 = require("uuid/v4");

AWS.config.update({
  secretAccessKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  accessKeyId: "XXXXXXXXXXXXXXX",
  region: "ap-northeast-1"
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3({ apiVersion: "2006-03-01" }),
    bucket: process.env.AWS_S3_BUCKET || "nuxtjs-ckeditor5-s3",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, callback) {
      const ext = mime.getExtension(file.mimetype);
      callback(null, uuidv4() + "." + ext);
    }
  })
});

const app = express();
app.use(cors());
app.post("/api/image-upload/", upload.single("file"), async (req, res) => {
  const url = req.file.location;
  if (!url) {
    return res.status(500).json({ error: new Error("upload failing") });
  }
  res.json({ default: url });
});

const PORT = process.env.PORT || 3001;
const listener = app.listen(PORT, () => {
  const { port } = listener.address();
  console.log(`Listen on http://localhost:${port}`);
});

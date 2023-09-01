const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
require("dotenv").config();
const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
const Upload = require("./routes/FileUpload");
const PORT = process.env.PORT;

db.connect();
cloudinary.cloudinaryConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use("/api/v1/upload", Upload);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`File running on PORT: ${PORT}`);
});

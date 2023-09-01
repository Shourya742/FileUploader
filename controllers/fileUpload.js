const File = require("../models/File");
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File is here", file);
    const path =
      __dirname + "/files/" + Date.now() + "." + file.name.split(".").pop();
    console.log("Path -> ", path);
    file.mv(path, (error) => {
      console.log(error);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

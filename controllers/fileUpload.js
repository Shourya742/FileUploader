const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
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

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    //Validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".").pop();
    if (!supportedTypes.includes(fileType)) {
      return res.status(404).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Demo");
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.videoFile;
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".").pop();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Demo");
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video updated successfully ",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    //Validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".").pop();
    if (!supportedTypes.includes(fileType)) {
      return res.status(404).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "Demo", 30);
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

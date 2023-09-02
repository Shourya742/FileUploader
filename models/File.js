const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});
fileSchema.post("save", async function (doc) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    //send mail
    const info = await transporter.sendMail({
      from: "Demon Slayer",
      to: doc.email,
      subject: "New File uploaded on cloudinary",
      html: `<h2>Hello there</h2> <br/> <h1>File uploaded successfully</h1> Veiw here : <a href="${doc.imageUrl}">Image</a>`,
    });

    console.log(info);
  } catch (error) {
    console.error(error);
  }
});
const File = mongoose.model("File", fileSchema);
module.exports = File;

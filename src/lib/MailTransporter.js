import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "localhost",
  port: process.env.MAIL_PORT || 2025,
  auth: {
    user: process.env.MAIL_USER || "project.2",
    pass: process.env.MAIL_PASS || "secret.2",
  },
});

export default transporter;

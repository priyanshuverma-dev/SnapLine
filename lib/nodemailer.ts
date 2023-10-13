import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // Your email service configuration
  service: "Gmail",
  auth: {
    user: process.env.NEXT_AUTH_EMAIL,
    pass: process.env.NEXT_AUTH_PASSWORD,
  },
});

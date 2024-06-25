const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD // Your email password
    }
  });


  const generateOTP = () => {
    const otp = crypto.randomBytes(3).toString('hex');
    return otp;
  };
  
  const sendOTP = async (email, otp) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'otp for login',
      text: `Your OTP code is ${otp}`
    };
  
    await transporter.sendMail(mailOptions);
  };

  module.exports = { generateOTP, sendOTP };

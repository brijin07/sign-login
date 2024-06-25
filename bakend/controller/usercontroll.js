const User = require("../db/mongoSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validatesign, loginvalidate } = require("./Allvalidation");
const { generateOTP, sendOTP } = require("./loginotp");



// signup user
exports.signUser = async (req, res) => {
  try {
    // validate body
    const { error } = validatesign.validate(req.body);
    if (error) {
      return res.status(401).json({ message: error.message });
    }

    // cheking email alredy exist
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashpassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({ username, email, password: hashpassword });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // validate body
    const { error } = loginvalidate.validate(req.body);
    if (error) {
      return res.status(401).json({ message: error.message });
    }

    const { email, password } = req.body;
    // check email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email " });
    }

    // check password exist
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    // Generate OTP and send it to the user's email
    const otp = generateOTP();
    await sendOTP(email, otp);

    user.otp = otp;
    await user.save();
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Clear OTP from the user document
    user.otp = null;
    await user.save();

    // Generate token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

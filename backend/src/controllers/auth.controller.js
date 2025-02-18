  const User = require('../models/user');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcryptjs');
  const nodemailer = require('nodemailer');
  const createHttpError = require('http-errors');
  require('dotenv').config();


  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "EXISTS" : "MISSING");

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing email credentials. Check your .env file.");
  process.exit(1);
  }
  // Setup Nodemailer untuk mengirim email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  

  // **REGISTER USER**
  exports.register = async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        throw createHttpError(409, 'User already exists');
      }

      const user = new User({ username, email, password, role });
      await user.save();

      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      next(err);
    }
  };

  // **LOGIN USER (Session-Based)**
  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      const user = await User.findOne({ email }).select('+password');
  
      if (!user || !(await user.comparePassword(password))) {
        throw createHttpError(401, 'Invalid credentials');
      }
  
      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
  
      res.status(200).json({ success: true, message: 'Login successful', user: req.session.user });
    } catch (err) {
      next(err);
    }
  };
  

  // **LOGOUT**
  exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  };

  // **RESET PASSWORD - KIRIM LINK RESET**
  exports.forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw createHttpError(404, 'User not found');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
      await user.save();

      const resetUrl = `http://localhost:5173/${token}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Reset Password Request',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
      });

      res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
      next(err);
    }
  };

  exports.resetPassword = async (req, res, next) => {
    try {
      // Ambil token dari URL path, bukan query parameter
      const { token } = req.params;
      const { newPassword } = req.body;
  
      if (!token) {
        throw createHttpError(400, 'Reset token is missing');
      }
  
      // Verifikasi token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded.userId, resetPasswordToken: token });
  
      if (!user || user.resetPasswordExpires < Date.now()) {
        throw createHttpError(400, 'Invalid or expired token');
      }
  
      // Hash password baru dan perbarui user
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      next(err);
    }
  };
  
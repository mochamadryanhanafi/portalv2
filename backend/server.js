require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const newsRoutes = require('./src/routes/news.routes'); // Tambah ini
const { errorHandler } = require('./src/middleware/error.middleware');

const app = express();

// Database connection
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',  // Ganti dengan key yang lebih aman
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set ke true jika menggunakan HTTPS
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/news', newsRoutes); // Tidak ada autentikasi

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

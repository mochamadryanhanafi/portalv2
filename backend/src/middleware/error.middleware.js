const createHttpError = require('http-errors');
const logger = require('../utils/logger');

exports.errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
    res.status(statusCode).json({
      success: false,
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
  } else {
    res.status(statusCode).json({
      success: false,
      error: message
    });
  }
};
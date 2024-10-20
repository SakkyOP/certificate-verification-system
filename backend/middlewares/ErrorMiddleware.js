const ErrorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
    const errorMessage = err.message || 'Internal Server Error'; // Default message

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errorMessage,
        ...(process.env.NODE_ENV.toLowerCase() === 'development' && { stack: err.stack }), // Include stack trace in development
    });
};

module.exports = ErrorMiddleware;
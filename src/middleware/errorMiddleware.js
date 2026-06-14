// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    // Log error details for development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error Stack:', err.stack);
    } else {
        console.error('Error Message:', err.message);
    }

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

// Async error wrapper utility (avoids writing try-catch in every controller)
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export { errorHandler, asyncHandler };

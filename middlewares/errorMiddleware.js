export function errorStatus(req, res, next) {
    const error = new Error('Custom error');
    next(error);
} 

export function customErrorHandler(error, req, res, next) {
    res.status(500).json({
        error: {
            message: error.message
        }
    });
    console.log(`Custom error log: request ${req.method} was called on ${req.path} path with query parameters ${JSON.stringify(req.query)}. ${error}`);  
}

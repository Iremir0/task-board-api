const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errorMessages = result.error.issues.map((err) => err.message);
            return res.status(400).json({
                status: 'error',
                message: errorMessages.join(', ')
            });
        }

        // Replace request body with parsed data to handle coercions/transforms
        req.body = result.data;
        next();
    };
};

export { validateRequest };

import jwt from 'jsonwebtoken';

export default (requiredRoles) => (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;

            if (requiredRoles && Array.isArray(requiredRoles) && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({
                    message: 'Insufficient privileges',
                });
            }

            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Invalid token',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access token provided',
        });
    }
};

const Jwt = require('../utils/jwt');

exports.authenticate = (
    req, res, next
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'Token Missing'
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = Jwt.verifyJwt(token);
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
}
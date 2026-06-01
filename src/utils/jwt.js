const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_TOKEN;


exports.generateJWT = (user) => {
    return jwt.sign({
        userId: user._id,
        role: user.role
    },
        SECRET_KEY, {
        expiresIn: '1h'
    }
    );
};


exports.verifyJwt = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_TOKEN
    );
}
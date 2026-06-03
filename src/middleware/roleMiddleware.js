// exports.adminOnly = (req, res, next) => {
//     if (req.user.role !== 'ADMIN') {
//         return res.status(403).json({
//             message: 'Asscess Denied! ADMIN only'
//         });
//     }
//     next();
// };


//GENERATIC TYPE:
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access Denied!'
            });
        }
        next();
    }
};
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.secretKey);
        next();
    }
    catch(error){
        return res.send({
            message: "Auth failed",
            success: false,
            error: error
        })
    }
}
const jwt = require("jsonwebtoken");

module.exports = (user) => 
    jwt.sign(
        {
            email: user.email,
            userID: user._id
        },
        process.env.secretKey,
        {
            expiresIn: "1h"
        }
     );

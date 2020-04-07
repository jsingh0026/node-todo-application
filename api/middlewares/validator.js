const { body } = require('express-validator');

exports.validate = (type) => {
    switch (type){
        case 'signup':{
            return[
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'minimum length of 4 characters').isLength({min: 4})
            ];
        }
        case 'login':{
            return[
                body('email', 'Invalid email').exists().isEmail()
            ]
        }
    }
}
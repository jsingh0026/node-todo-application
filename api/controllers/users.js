
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const Users = require('../models/users');

exports.getUsers = (req, res, next) => {
    Users.find()
    .exec()
    .then( users => {
      res.send({
        message: 'Get Method: employee data',
        success: true,
        data: users.map( user => {
          return{
          id: user._id,
          email: user.email,
          password: user.password
        }
        })
    });
    })
    .catch( err => {
      res.send(err);
    });
  };

  exports.userSignup = (req, res, next) => {
    const user = new Users(req.body);
    user
      .save()
      .then(result => {
        console.log(result);
        res.send({
          message: "User created",
          success: true, 
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.send({
          error: err
        });
      });
};

exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.send({
                message: "Auth failed",
                success: false
            })
        }
        bcrypt.compare(req.body.password, user.password, (err,result) => {
            if(err) {
                return res.send({
                    message: "Auth failed",
                    success: false
                })
            } 
            if(result){
                const token = jwt.sign(
                    {
                        email: user.email,
                        userID: user._id
                    },
                    process.env.secretKey,
                    {
                        expiresIn: "1h"
                    }
                 );
                return res.send({
                    message: "Auth successful",
                    success: true,
                    data: {
                        token: token,
                        userDetails: {
                            id: user._id,
                            email: user.email
                        }
                    }
                })    
            }
        }) 
    })
    .catch(error => {
      res.send({
        message: "error",
        success: false,
        error:error
      });
    })
};

// exports.login = (req, res, next) => {
//     Users.findOne({ email: req.body.email })
//     .exec()
//     .then(user => {
//         if(user){
//             console.log(user);
//             Users.comparePassword( user.password, (error, isMatch) => {
//                 console.log(isMatch);
//                 console.log(error);
//             })
//         }
//         // if(user.length < 1){
//         //     return res.send({
//         //         message: "Auth failed",
//         //         success: false
//         //     })
//         // }
//         // bcrypt.compare(req.body.password, user.password, (err,result) => {
//         //     if(err) {
//         //         return res.send({
//         //             message: "Auth failed",
//         //             success: false
//         //         })
//         //     } 
//         //     // if(result){
//         //     //     const token = jwt.sign(
//         //     //         {
//         //     //             email: user.email,
//         //     //             userID: user._id
//         //     //         },
//         //     //         process.env.secretKey,
//         //     //         {
//         //     //             expiresIn: "1h"
//         //     //         }
//         //     //      );
//         //     //     return res.send({
//         //     //         message: "Auth successful",
//         //     //         success: true,
//         //     //         data: token
//         //     //     })    
//         //     // }
//         // }) 
//     })
// };

  exports.deleteUser = (req, res, next) => {
    const id = req.params.usersID;
    Users.remove({ _id: id})
    .exec()
    .then( result => {
        res.json({
          success: true,
          result:result});
    })
    .catch(err => {
        res.json(err);
    })
  };
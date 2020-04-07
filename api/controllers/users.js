
const { validationResult } = require('express-validator');
const getToken = require('../middlewares/config');
const customResponse = require('../middlewares/customResponse');

const Users = require('../models/users');

exports.getUsers = (req, res, next) => {
    Users.find()
    .exec()
    .then( users => {
      res.send(customResponse('Get Method: employee data', true, users ));
    })
    .catch( err => {
      res.send( customResponse('Get Method: employee data', false, err ));
    });
  };

  exports.userSignup = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.send( customResponse('Validation error', false, errors));
      return;
    }

    const user = new Users(req.body);
    user
      .save()
      .then(result => {
        console.log(result);
        res.send(customResponse('signup', true, result));
      })
      .catch(err => {
        res.send(customResponse('error', false, err));
      });
};

exports.login = (req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.send( customResponse('Validation error', false, errors));
      return;
    }
    Users.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        user.comparePassword( req.body.password, (error, isMatch) => {
          if(isMatch){
            const token = getToken(user);
            return res.send(customResponse("Auth successful", true, {token: token, data: user}))    
          }
          else {
            return res.send( customResponse("Auth failed", false, err))
          }
        })
    })
    .catch(error => {
      res.send(customResponse("user not found", false, error));
    })
};

  exports.deleteUser = (req, res, next) => {
    const id = req.params.usersID;
    Users.remove({ _id: id})
    .exec()
    .then( result => {
        res.send(customResponse('user deleted', true, result));
    })
    .catch(err => {
        res.json(customResponse('error', false, err));
    })
  };
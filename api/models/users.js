const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: { 
        type: String, 
        require: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, require: true }
});

usersSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });

  usersSchema.methods.comparePassword = function comparePassword(pass, cb) {
      bcrypt.compare(pass, this.password, (err, isMatch) => {
        cb(err, isMatch);
      });
  };

module.exports = mongoose.model('Users', usersSchema);
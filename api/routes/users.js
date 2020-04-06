const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get("/", UserController.getUsers);

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.login);

router.delete('/:usersID', UserController.deleteUser);

module.exports = router;
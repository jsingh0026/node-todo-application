const express = require('express');
const router = express.Router();

const ToDoController = require('../controllers/to-do-list');
const checkAuth = require('../middlewares/check-auth'); 

router.get("/",checkAuth , ToDoController.getTasks);

router.post("/",checkAuth , ToDoController.addTask);

router.put("/:taskID",checkAuth , ToDoController.updateTask);

router.delete('/:taskID',checkAuth , ToDoController.deleteTask);

module.exports = router;